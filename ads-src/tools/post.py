"""Post-process raw Remotion renders into the delivery pack.
Loudness -14 LUFS (2-pass loudnorm), H.264 yuv420p + AAC, faststart, <8 MB, 4:5 crops of the 15 s cuts,
covers, .srt, safe-zone frames and QC contact sheets."""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

SCR = "/tmp/claude-0/-home-claude/913e448f-9965-5831-97f9-9cc952847ae6/scratchpad/pack"
RAW = f"{SCR}/raw"
QC = f"{SCR}/qc"
OUT = "/home/claude/rf-pack/public/ads/pack"
os.makedirs(OUT, exist_ok=True)
SPECS = {s["id"]: s for s in json.load(open(f"{SCR}/meta.json"))}
COVER_FRAME = {"2304": 22, "line": 44, "night": 50}
SAFE_FRAME = {"RA-2304-15s": 200, "RA-line-15s": 300, "RA-night-15s": 300}
only = sys.argv[1:]

def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)

def loudnorm_filter(src):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", src, "-af", "loudnorm=I=-14:TP=-2:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
    return (f"loudnorm=I=-14:TP=-2:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
            f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")

def encode(src, dst, vf=None, crf=18):
    af = loudnorm_filter(src)
    while True:
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", src]
        if vf: cmd += ["-vf", vf]
        cmd += ["-af", af, "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-profile:v", "high", "-level", "4.1",
                "-pix_fmt", "yuv420p", "-r", "30", "-g", "60", "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-ac", "2",
                "-movflags", "+faststart", dst + ".part.mp4"]
        run(cmd)
        size = os.path.getsize(dst + ".part.mp4")
        if size < 7.8e6 or crf >= 28: break
        crf += 2
    os.replace(dst + ".part.mp4", dst)
    return crf

def probe(f):
    d = json.loads(run(["ffprobe", "-v", "error", "-show_entries", "format=duration,size", "-of", "json", f]).stdout)["format"]
    return float(d["duration"]), int(d["size"])

def ebur(f):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
    i = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)[-1])
    tp = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r.stderr)[-1])
    return i, tp

def ts(fr):
    t = fr / 30
    return f"{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round((t-int(t))*1000)):03d}"

VO_DUR = {"A1": 1.474, "A1L": 3.888, "A2": 3.919, "A3": 3.293, "A4": 5.29, "B1": 2.802, "B2": 2.799, "C1": 4.443, "C2": 2.08, "E": 2.398}
VO_TXT = {"A1": "היי! אפשר לעזור?", "A1L": "היי, אני העוזרת הדיגיטלית של הקליניקה. אפשר לעזור?",
          "A2": "₪450 לטיפול. לשמור לך שיחת ייעוץ?", "A3": "רשמתי, דנה. הקליניקה תחזור אלייך בבוקר.",
          "A4": "בשבת אנחנו סגורים. ביום ראשון יש תור פנוי בעשר. לשמור לך?", "B1": "היי, אני העוזרת החדשה שלכם באתר.",
          "B2": "כן, יש מחר בחמש. לשמור לך?", "C1": "בטח! יש מחר בשמונה בבוקר. לשמור לך מקום?",
          "C2": "Hi! I can help you in English too.", "E": "רוצים לראות אותי על האתר שלכם?"}
SCENE_TXT = {  # on-screen text of brand scenes, for viewers who turn captions on
    "compare": "חצי משרה בשכר מינימום: ≈₪3,200 בחודש. עוזרת AI באתר: ₪99 לחודש / שעת שיחה.",
    "kinetic": "עונה בקול. בעברית. 24/7.",
    "code": "שורת קוד אחת. את הדמות, הקול והידע אנחנו מקימים בשבילכם.",
    "offer": "הקמה ₪0. ₪99 לחודש / שעת שיחה. מבטלים בכל חודש.",
    "badges": "עובד על WordPress, Wix, Shopify, HTML וכל אתר אחר.",
    "chars": "דמות וקול בסגנון שלכם. אתם בוחרים מראה, קול ושם.",
    "multi": "עד 3 מבקרים בו זמנית.",
    "langs": "עברית, אנגלית ותאית.",
    "end": "הדגמה חיה של 3 דקות על האתר שלכם. בחינם. ₪99 לחודש / שעת שיחה. הקמה ₪0.",
}

def srt(spec):
    ev = []
    for v in spec["voices"]:
        ev.append((v["at"], v["at"] + round(VO_DUR[v["key"]] * 30) + 6, "(דמות AI) " + VO_TXT[v["key"]]))
    for c in spec["captions"]:
        ev.append((c["from"], c["to"], " ".join(g["text"] for g in c["groups"])))
    if spec.get("offerStrip"):
        a, b = spec["offerStrip"]; ev.append((a, b, "הדגמה חיה בחינם. ₪99 לחודש / שעת שיחה."))
    for sc in spec["scenes"]:
        if sc["type"] in SCENE_TXT:
            ev.append((sc["from"] + 4, sc["from"] + sc["dur"], SCENE_TXT[sc["type"]]))
    ev.sort()
    # merge cues that start within 1 s of the previous cue, then clip each cue at the next start
    merged = []
    for a, b, t in ev:
        if merged and a < merged[-1][0] + 30:
            pa, pb, pt = merged[-1]
            merged[-1] = (pa, max(pb, b), pt + "\n" + t)
        else:
            merged.append((a, b, t))
    out = []
    for i, (a, b, t) in enumerate(merged):
        if i + 1 < len(merged): b = min(b, merged[i + 1][0])
        out.append(f"{i+1}\n{ts(a)} --> {ts(b)}\n{t}\n")
    return "\n".join(out)

def contact(mp4, name, frames):
    tiles = []
    for i, fr in enumerate(frames):
        p = f"{QC}/_c{i}.jpg"
        run(["ffmpeg", "-y", "-v", "error", "-ss", f"{fr/30:.3f}", "-i", mp4, "-frames:v", "1", "-q:v", "3", p])
        tiles.append(Image.open(p).convert("RGB"))
    w = 360; h = int(tiles[0].height * w / tiles[0].width)
    sheet = Image.new("RGB", (w * len(tiles), h + 40), (20, 20, 20))
    d = ImageDraw.Draw(sheet)
    for i, (t, fr) in enumerate(zip(tiles, frames)):
        sheet.paste(t.resize((w, h)), (i * w, 40))
        d.text((i * w + 8, 10), f"{fr/30:.1f}s", fill=(255, 255, 0))
    sheet.save(f"{QC}/{name}_contact.jpg", quality=88)

def safezone(mp4, dst, fr):
    p = f"{QC}/_s.jpg"
    run(["ffmpeg", "-y", "-v", "error", "-ss", f"{fr/30:.3f}", "-i", mp4, "-frames:v", "1", "-q:v", "2", p])
    im = Image.open(p).convert("RGBA"); W, H = im.size
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    red = (255, 40, 60, 95)
    d.rectangle([0, 0, W, int(H * 0.14)], fill=red)
    d.rectangle([0, int(H * 0.65), W, H], fill=red)
    d.rectangle([W - 130, int(H * 0.40), W, int(H * 0.65)], fill=(255, 160, 0, 95))  # action rail (LTR apps)
    d.rectangle([0, int(H * 0.40), 130, int(H * 0.65)], fill=(255, 160, 0, 45))      # mirrored rail (Hebrew UI)
    for y0 in (260, 1610):
        for x in range(0, W, 30): d.line([x, y0, x + 15, y0], fill=(0, 230, 255, 255), width=4)
    im = Image.alpha_composite(im, ov).convert("RGB"); d = ImageDraw.Draw(im)
    try: f = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
    except Exception: f = None
    d.text((20, int(H * 0.14) - 42), "top 14% (Reels UI)", fill=(255, 255, 255), font=f)
    d.text((20, int(H * 0.65) + 12), "bottom 35% (caption / CTA stack)", fill=(255, 255, 255), font=f)
    d.text((20, 1615), "4:5 crop edge (y 260-1610)", fill=(0, 230, 255), font=f)
    im.save(dst, quality=90)

report = []
if os.environ.get('SRT_ONLY'):
    for sid, spec in SPECS.items():
        for b in (spec['file'], spec['file'].replace('9x16', '4x5')):
            if os.path.exists(f'{OUT}/{b}.mp4'): open(f'{OUT}/{b}.srt', 'w').write(srt(spec))
    sys.exit(0)
for sid, spec in SPECS.items():
    if only and sid not in only: continue
    src = f"{RAW}/{sid}.mp4"
    if not os.path.exists(src): print("missing", src); continue
    base = spec["file"]
    concept = base.split("_")[1]
    dst = f"{OUT}/{base}.mp4"
    crf = encode(src, dst)
    dur, size = probe(dst); i, tp = ebur(dst)
    cf = COVER_FRAME[concept]
    run(["ffmpeg", "-y", "-v", "error", "-ss", f"{cf/30:.3f}", "-i", dst, "-frames:v", "1", "-q:v", "2", f"{OUT}/{base}.jpg"])
    open(f"{OUT}/{base}.srt", "w").write(srt(spec))
    n = spec["dur"]; frames = [int(n * k / 6) + 8 for k in range(6)]
    contact(dst, base, frames)
    report.append((base, dur, size, crf, i, tp))
    if sid in SAFE_FRAME:
        safezone(dst, f"{OUT}/{base}_safezone.jpg", SAFE_FRAME[sid])
        b45 = base.replace("9x16", "4x5")
        d45 = f"{OUT}/{b45}.mp4"
        crf45 = encode(src, d45, vf="crop=1080:1350:0:260")
        dur2, size2 = probe(d45); i2, tp2 = ebur(d45)
        run(["ffmpeg", "-y", "-v", "error", "-ss", f"{cf/30:.3f}", "-i", d45, "-frames:v", "1", "-q:v", "2", f"{OUT}/{b45}.jpg"])
        open(f"{OUT}/{b45}.srt", "w").write(srt(spec))
        contact(d45, b45, frames)
        report.append((b45, dur2, size2, crf45, i2, tp2))
for r in report:
    print(f"{r[0]}\t{r[1]:.2f}s\t{r[2]/1e6:.2f}MB\tcrf{r[3]}\tI={r[4]} LUFS\tTP={r[5]} dBFS")
