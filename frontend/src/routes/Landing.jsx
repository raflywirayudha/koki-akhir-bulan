import { useNavigate } from 'react-router-dom';
import { Camera, Sparkles, PiggyBank, ArrowRight, ChefHat, Lightbulb, Heart } from 'lucide-react';
import landingPageImg from '../assets/landing-page.png';

const features = [
  {
    icon: Camera,
    title: 'Foto Sisa Bahan',
    desc: 'Cukup foto bahan di kulkas, AI akan mengenali dan menyarankan resep.',
  },
  {
    icon: Sparkles,
    title: 'Resep Instan',
    desc: 'Dapatkan resep lengkap dengan langkah memasak dalam hitungan detik.',
  },
  {
    icon: PiggyBank,
    title: 'Hemat di Akhir Bulan',
    desc: 'Manfaatkan sisa bahan tanpa perlu belanja tambahan.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="pt-5 pb-5 md:pt-5 md:pb-5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-5">
            <img src={landingPageImg} alt="Koki Akhir Bulan" className="w-full max-w-sm mx-auto" />
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-4xl text-foreground leading-tight mb-4">
            Dompet Tipis? <br /> Kulkas Kosong?
            <br />
            <span className="text-primary font-bold italic">Koki Akhir Bulan</span> Siap Bantu!
          </h1>

          <p className="text-foreground/60 text-lg max-w-5xl mx-auto mb-5 leading-relaxed">
            Tuliskan atau foto bahan yang tersisa, dan dapatkan resep
           lezat yang langsung bisa kamu praktekkan. <br /><span className="font-bold">Hemat, kreatif, dan anti   food waste!</span>
          </p>

          <button
            onClick={() => navigate('/chat')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Sparkles size={20} />
            Mulai Memasak
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20 grid gap-6 md:grid-cols-3 mt-10">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_var(--color-primary)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-black bg-primary text-white mb-4 group-hover:scale-110 transition-transform duration-200">
              <f.icon size={24} />
            </div>
            <h3 className="font-heading text-foreground mb-1">
              {f.title}
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      <section id="tentang" className="max-w-5xl mx-auto px-4 pb-20 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-black bg-primary text-white mb-3 shadow-[3px_3px_0_0_#000]">
            <ChefHat size={28} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">
            Tentang{' '}
            <span className="text-primary font-bold italic">Koki Akhir Bulan</span>
          </h2>
          <p className="text-foreground/60 mt-1 max-w-md mx-auto text-sm">
            Masak kreatif dari sisa bahan, hemat di akhir bulan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl p-6 border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-primary)] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-primary text-white flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h3 className="font-heading text-foreground">Apa Itu?</h3>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <strong>Koki Akhir Bulan</strong> adalah asisten memasak berbasis AI
              yang membantu kamu mengolah sisa bahan makanan menjadi resep lezat.
              Cukup masukkan bahan yang ada — baik lewat teks maupun foto — dan
              dapatkan resep instan yang praktis dan hemat.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-primary)] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-primary text-white flex items-center justify-center">
                <Heart size={20} />
              </div>
              <h3 className="font-heading text-foreground">Misi Kami</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Mengurangi pemborosan makanan (food waste) rumah tangga.',
                'Membantu kamu berhemat di akhir bulan.',
                'Memberikan inspirasi masak dari bahan seadanya.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                  <Sparkles size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-primary)] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-primary text-white flex items-center justify-center">
                <ChefHat size={20} />
              </div>
              <h3 className="font-heading text-foreground">Cara Kerja</h3>
            </div>
            <ol className="space-y-3">
              {[
                'Ketik atau foto bahan makanan yang tersisa di dapur.',
                'AI (Google Gemini 2.5 Flash) memproses dan membuat resep.',
                'Dapatkan resep lengkap — nama, bahan, langkah, dan tips.',
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/70">
                  <span className="shrink-0 w-5 h-5 rounded-md border-2 border-black bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
