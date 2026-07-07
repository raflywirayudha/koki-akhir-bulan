import { ChefHat, Lightbulb, Heart, Sparkles } from 'lucide-react';

const cards = [
  {
    icon: Lightbulb,
    title: 'Apa Itu?',
    content: (
      <p>
        <strong>Koki Akhir Bulan</strong> adalah asisten memasak berbasis AI
        yang membantu kamu mengolah sisa bahan makanan menjadi resep lezat.
        Cukup masukkan bahan yang ada — baik lewat teks maupun foto — dan
        dapatkan resep instan yang praktis dan hemat.
      </p>
    ),
  },
  {
    icon: Heart,
    title: 'Misi Kami',
    content: (
      <ul className="space-y-2">
        {[
          'Mengurangi pemborosan makanan (food waste) rumah tangga.',
          'Membantu kamu berhemat di akhir bulan.',
          'Memberikan inspirasi masak dari bahan seadanya.',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Sparkles size={14} className="text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: ChefHat,
    title: 'Cara Kerja',
    content: (
      <ol className="space-y-3">
        {[
          'Ketik atau foto bahan makanan yang tersisa di dapur.',
          'AI (Google Gemini 2.5 Flash) memproses dan membuat resep.',
          'Dapatkan resep lengkap — nama, bahan, langkah, dan tips.',
        ].map((item, i) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span className="shrink-0 w-5 h-5 rounded-md border-2 border-black bg-primary text-white text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    ),
  },
];

export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl border-2 border-black bg-primary text-white mb-4 shadow-[3px_3px_0_0_#000]">
          <ChefHat size={32} />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground">
          Tentang{' '}
          <span className="text-primary font-bold italic">Koki Akhir Bulan</span>
        </h1>
        <p className="text-foreground/60 mt-2 max-w-md mx-auto">
          Masak kreatif dari sisa bahan, hemat di akhir bulan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl p-6 border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-primary)] transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-primary text-white flex items-center justify-center">
                <card.icon size={20} />
              </div>
              <h2 className="font-heading text-foreground">
                {card.title}
              </h2>
            </div>
            <div className="text-sm text-foreground/70 leading-relaxed">
              {card.content}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
