import numpy as np, scipy.io.wavfile as w
from scipy.signal import butter, sosfilt
R = 48000
rng = np.random.default_rng(7)
def t(d): return np.arange(int(R*d))/R
def env(n, a, d):  # attack, exp decay
    x = np.arange(n)/R
    e = np.minimum(1, x/a) * np.exp(-x/d)
    return e
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=R, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, 'high', fs=R, output='sos'), x)
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=R, output='sos'), x)
def save(name, x, peak=0.7):
    x = x / (np.abs(x).max() + 1e-9) * peak
    w.write(name, R, (x*32767).astype(np.int16))
# key click: short filtered noise + tiny thump
def key(seed):
    r = np.random.default_rng(seed); n = int(R*0.06)
    x = bp(r.standard_normal(n), 1800 + seed%5*300, 7000) * env(n, 0.0005, 0.008)
    x += 0.5*np.sin(2*np.pi*(180+seed%3*20)*t(0.06)) * env(n, 0.0005, 0.012)
    return x
for i in range(6): save(f"key{i}.wav", key(i), 0.5)
# pop: pitch-rising sine blip
x = t(0.16); f = 380 + 900*np.minimum(1, x/0.05)
p = np.sin(2*np.pi*np.cumsum(f)/R) * env(len(x), 0.002, 0.045)
save("pop.wav", p + 0.15*bp(rng.standard_normal(len(x)), 2000, 6000)*env(len(x), 0.001, 0.01), 0.6)
# ding: two soft bell tones (generic notification, not a brand sound)
def bell(f0, d):
    x = t(d); return (np.sin(2*np.pi*f0*x) + 0.35*np.sin(2*np.pi*f0*2.01*x) + 0.12*np.sin(2*np.pi*f0*3.02*x)) * env(len(x), 0.003, 0.22)
d = np.zeros(int(R*0.9)); b1 = bell(1318.5, 0.6); b2 = bell(1760, 0.75)
d[:len(b1)] += b1; d[int(R*0.12):int(R*0.12)+len(b2)] += b2
save("ding.wav", d, 0.6)
# soft ping for unread messages
x = t(0.35); save("ping.wav", np.sin(2*np.pi*1046.5*x)*env(len(x),0.002,0.07) + 0.3*np.sin(2*np.pi*2093*x)*env(len(x),0.002,0.04), 0.45)
# swoosh: noise with sweeping bandpass, swelling envelope
n = int(R*0.42); x = rng.standard_normal(n); out = np.zeros(n); seg = 512
for i in range(0, n, seg):
    fc = 500 + 5000*(i/n)
    out[i:i+seg] = bp(x[i:i+seg], fc*0.6, min(fc*1.6, 20000), 1)
e = np.sin(np.pi*np.linspace(0,1,n))**2
save("swoosh.wav", lp(out*e, 9000), 0.45)
# whoosh low for scene cuts (deeper)
save("whoosh.wav", lp(hp(rng.standard_normal(int(R*0.5)), 150), 2500)*np.sin(np.pi*np.linspace(0,1,int(R*0.5)))**3, 0.4)
# tap / unlock click
x = t(0.05); save("tap.wav", bp(rng.standard_normal(len(x)), 2500, 9000)*env(len(x), 0.0003, 0.006) + 0.6*np.sin(2*np.pi*90*x)*env(len(x),0.0005,0.01), 0.45)
# send: short upward chirp
x = t(0.12); f = 600 + 1400*(x/0.12)
save("send.wav", np.sin(2*np.pi*np.cumsum(f)/R)*env(len(x),0.002,0.03), 0.35)
# room tone: pink-ish noise, very low (scaled in mix)
n = R*60; x = rng.standard_normal(n); x = lp(x, 400)
save("room.wav", x, 0.3)
print("ok")
