import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import { PRODUCTS } from '@/config/site';

/**
 * Homepage hub: one tile per product page. Customer service is what most clients
 * ask for, so it gets the big tile; four share the column beside it and any
 * fifth runs as a wide strip underneath.
 */
export default function ProductsGrid() {
  const { pick, tr, fontDisplay, isHebrew } = useT();
  const [lead, ...rest] = PRODUCTS;
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;

  return (
    <section id="products" className="py-24 sm:py-28 px-5 bg-paper scroll-mt-16">
      <div className="max-w-[1200px] mx-auto">
        <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.12] max-w-[22ch] text-ink`}>
          {pick(
            'שש דרכים לשים דמות חיה מול הלקוחות שלכם',
            'Six ways to put a live character in front of your customers',
            'หกวิธีให้ตัวละคร AI ได้คุยกับลูกค้าของคุณ'
          )}
        </h2>
        <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[60ch] leading-[1.7]">
          {pick(
            'אותה טכנולוגיה בכל אחד מהם: פנים, קול ואופי, שעונים בזמן אמת. בעברית, באנגלית ובתאית.',
            'The same technology in each: a face, a voice and a personality that answer in real time. In Hebrew, English and Thai.',
            'เทคโนโลยีเดียวกันในทุกแบบ มีใบหน้า เสียง และบุคลิก ตอบโต้แบบเรียลไทม์ รองรับภาษาฮีบรู อังกฤษ และไทย'
          )}
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          <Link
            to={lead.path}
            className="group lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-[22px] border border-ink/10 bg-mist flex flex-col sm:flex-row lg:flex-col min-h-[420px]"
          >
            <div className="relative sm:w-1/2 lg:w-full h-[300px] sm:h-auto lg:h-[340px] overflow-hidden bg-white">
              <img
                src={tr(lead.image)}
                alt={tr(lead.alt)}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute top-4 start-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-[0.78rem] font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-[#ff3b5c] animate-live-pulse" />
                {pick('הכי מבוקש', 'Most requested', 'ยอดนิยม')}
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="text-[1.5rem] font-bold text-ink leading-tight">{tr(lead.name)}</h3>
              <p className="mt-2 text-[1rem] text-ink/70 leading-[1.6] max-w-[46ch]">{tr(lead.blurb)}</p>
              <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-live-gradient">
                {pick('לעמוד המלא', 'See how it works', 'ดูรายละเอียด')}
                <Arrow className="w-4 h-4 text-live-a transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </span>
            </div>
          </Link>

          {rest.map((p, i) => {
            const wide = i === 4;
            return (
            <Link
              key={p.path}
              to={p.path}
              className={`group relative overflow-hidden rounded-[22px] border border-ink/10 bg-mist flex ${wide ? 'flex-col sm:flex-row lg:col-span-4' : 'flex-col'}`}
            >
              <div className={`relative overflow-hidden bg-white ${wide ? 'h-[170px] sm:h-auto sm:w-[38%] lg:w-[24%] shrink-0' : 'h-[170px]'}`}>
                <img
                  src={tr(p.image)}
                  alt={tr(p.alt)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className={`p-5 flex flex-col flex-1 ${wide ? 'sm:justify-center sm:p-7' : ''}`}>
                <h3 className="text-[1.08rem] font-bold text-ink leading-snug">{tr(p.name)}</h3>
                <p className="mt-1.5 text-[0.88rem] text-ink/65 leading-[1.55]">{tr(p.blurb)}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
