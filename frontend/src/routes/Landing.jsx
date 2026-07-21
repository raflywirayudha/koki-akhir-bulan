import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ChefHat, Lightbulb, Heart, FileText, Bot, Clock, UtensilsCrossed, TrendingDown, ChevronDown, ShieldCheck, Cpu, HelpCircle } from 'lucide-react';
import landingPageImg from '../assets/landing-page.png';

const steps = [
  { number: 1, icon: FileText, title: 'Input Bahan', desc: 'Ketik atau foto bahan makanan yang tersisa di dapur.' },
  { number: 2, icon: Bot, title: 'AI Memproses', desc: 'Google Gemini 2.5 Flash menganalisis dan menciptakan resep yang pas.' },
  { number: 3, icon: ChefHat, title: 'Dapat Resep', desc: 'Resep lengkap dengan langkah memasak siap kamu praktekkan.' },
];

const faqs = [
  { q: 'Apakah Koki Akhir Bulan gratis?', a: 'Ya! Koki Akhir Bulan sepenuhnya gratis digunakan. Kamu bisa membuat resep sebanyak yang kamu mau tanpa biaya.' },
  { q: 'Bahan apa saja yang bisa diproses?', a: 'Hampir semua bahan makanan bisa diproses — sayuran, protein, karbohidrat, bumbu dapur, dan sisa makanan lainnya. Cukup tulis atau foto bahannya.' },
  { q: 'Apakah bisa foto bahan langsung?', a: 'Bisa! Kamu bisa upload foto bahan makanan langsung di chat. AI akan mengenali bahan-bahan yang terlihat di foto dan menyarankan resep.' },
  { q: 'Bagaimana akurasi resep yang dihasilkan?', a: 'Resep dihasilkan oleh Google Gemini 2.5 Flash, AI canggih Google. Hasilnya akurat dan bisa langsung dipraktekkan, tapi tetap gunakan penilaianmu saat memasak.' },
  { q: 'Apakah bisa atur preferensi diet?', a: 'Saat ini resep disesuaikan dengan bahan yang kamu masukkan. Fitur preferensi diet (vegetarian, vegan, bebas gluten) sedang dalam pengembangan.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

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

      {/* Trust Badge */}
      <section className="max-w-5xl mx-auto px-4 pb-10 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-xl px-4 py-2.5 shadow-[2px_2px_0_0_#000]">
            <Cpu size={18} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Powered by Google Gemini 2.5 Flash</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-xl px-4 py-2.5 shadow-[2px_2px_0_0_#000]">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-xs font-bold text-foreground">AI-Powered Recipe Generator</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-xl px-4 py-2.5 shadow-[2px_2px_0_0_#000]">
            <Sparkles size={18} className="text-primary" />
            <span className="text-xs font-bold text-foreground">100% Gratis</span>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="bg-primary-light border-y-2 border-black py-16 mb-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-black bg-primary text-white mb-3 shadow-[3px_3px_0_0_#000]">
              <ChefHat size={28} />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Cara Kerja</h2>
            <p className="text-foreground/60 mt-1 max-w-md mx-auto text-sm">
              Tiga langkah mudah menuju resep lezat.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-0">
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-primary/40" />

            {steps.map((step) => (
              <div key={step.title} className="relative flex flex-col items-center text-center md:w-1/3 px-6">
                <div className="relative z-10 w-16 h-16 rounded-2xl border-2 border-black bg-primary text-white flex items-center justify-center shadow-[3px_3px_0_0_#000] mb-4 transition-transform duration-200 hover:scale-105">
                  <step.icon size={28} />
                </div>
                <span className="absolute -top-2 right-6 w-7 h-7 rounded-lg border-2 border-black bg-white text-primary font-bold text-xs flex items-center justify-center shadow-[2px_2px_0_0_#000] z-20">
                  {step.number}
                </span>
                <h3 className="font-heading text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contoh Resep */}
      <section className="max-w-5xl mx-auto px-4 pb-20 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-black bg-primary text-white mb-3 shadow-[3px_3px_0_0_#000]">
            <UtensilsCrossed size={28} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">Contoh Resep</h2>
          <p className="text-foreground/60 mt-1 max-w-md mx-auto text-sm">
            Begini hasil resep yang akan kamu dapatkan.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] overflow-hidden">
          <div className="bg-primary px-6 py-4 border-b-2 border-black">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-heading text-lg text-white">Nasi Goreng Sisa Sayuran</h3>
              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary bg-white px-2.5 py-1 rounded-lg border border-black">
                <Sparkles size={12} /> Resep AI
              </span>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs text-foreground/50 mb-5 pb-5 border-b border-dashed border-foreground/10">
              <Clock size={14} /> 15 menit
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded bg-primary" />
                  Bahan
                </h4>
                <ul className="text-sm text-foreground/70 space-y-2">
                  {['Nasi sisa semalam', 'Wortel & buncis sisa', 'Telur 1 butir', 'Bawang putih, kecap, garam'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded bg-primary" />
                  Langkah
                </h4>
                <ol className="text-sm text-foreground/70 space-y-3">
                  {['Tumis bawang putih, masukkan telur dan orak-arik.', 'Masukkan nasi, sayuran, kecap. Aduk rata, sajikan!'].map((item, i) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="shrink-0 w-5 h-5 rounded-md border-2 border-black bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-dashed border-foreground/10 text-center">
              <button
                onClick={() => navigate('/chat')}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm border-2 border-black shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                Coba sekarang <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Food Waste Stats */}
      <section className="bg-primary-light border-y-2 border-black py-16 mb-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-black bg-primary text-white mb-3 shadow-[3px_3px_0_0_#000]">
              <TrendingDown size={28} />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Food Waste di Indonesia</h2>
            <p className="text-foreground/60 mt-1 max-w-lg mx-auto text-sm">
              Setiap tahun, jutaan ton makanan berakhir di tempat sampah. Yuk, mulai berkontribusi!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-1">23-48</div>
              <div className="text-xs text-foreground/50 font-bold uppercase tracking-wide mb-2">Juta Ton / Tahun</div>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">Total makanan terbuang di Indonesia setiap tahunnya.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-1">44%</div>
              <div className="text-xs text-foreground/50 font-bold uppercase tracking-wide mb-2">Dari Total Sampah</div>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">Makanan menyumbang hampir setengah dari total sampah rumah tangga.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-1">Rp 330</div>
              <div className="text-xs text-foreground/50 font-bold uppercase tracking-wide mb-2">Triliun / Tahun</div>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">Kerugian ekonomi akibat food waste di Indonesia.</p>
            </div>
          </div>
          <p className="text-center text-xs text-foreground/40 mt-8">Sumber: Kementerian PPN/Bappenas &amp; UNEP Food Waste Index Report</p>
        </div>
      </section>

      <section id="tentang" className="bg-white max-w-5xl mx-auto px-4 pb-20 pt-10 scroll-mt-20 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000] mb-20">
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

        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-20 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-black bg-primary text-white mb-3 shadow-[3px_3px_0_0_#000]">
            <HelpCircle size={28} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">Pertanyaan Umum</h2>
          <p className="text-foreground/60 mt-1 max-w-md mx-auto text-sm">Ada yang ingin ditanyakan?</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-heading text-foreground">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-primary shrink-0 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-96 pb-5 px-5' : 'max-h-0'
                }`}
              >
                <p className="text-sm text-foreground/70 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white mt-10">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground/50">&copy; 2026 Koki Akhir Bulan. All rights reserved.</p>
            <span className="text-xs text-foreground/50">Masak kreatif dari sisa bahan, hemat di akhir bulan.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
