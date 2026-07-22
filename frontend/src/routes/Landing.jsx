import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Cpu, ShieldCheck, Keyboard, Camera, Search, Upload, Clock, Wallet } from 'lucide-react';
import landingPageImg from '../assets/landing-page.png';

const recipes = [
  {
    name: 'Nasi Telur Kecap Spesial',
    badge: 'TERMURAH',
    badgeColor: 'bg-primary-light text-foreground',
    time: '5 MIN',
    price: '< Rp 5k',
    tags: ['Telur', 'Nasi'],
    bg: 'bg-white',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq91zGVaR7MJs8FViSpHKFdYXQRpHo49rk1X8OG2CfWYxalDDMLD9qtNyyYGp0lL9RV0gmh3rv8cPetg4USuPleIi0ggbNljAAZdTAxklXod0nPz6CYg0NyBUDAdvAcIcUdhtNaWht4LiSFJZOkd2-R-SK6uL51xXkfBCt-5fTqi6VcSgddC1o8N_rdD28zGkCT0lVaQ1OQ8PCyovJ3dUjKNEO8NcQYMVYdGSzWL6uci9ugDpkcFJP',
  },
  {
    name: 'Mie Dok-Dok Sisa Kosan',
    badge: 'TERCEPAT',
    badgeColor: 'bg-secondary text-white',
    time: '10 MIN',
    price: '< Rp 10k',
    tags: ['Mie Instan', 'Sosis'],
    bg: 'bg-accent-light',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBflbazs6AZJGHu9vy-nfpHBFW6HFRVWvXUPH8PKXhADsAaiwmrGy3p0AucrY_-yunKhH0rqB6be-CLlsKCFyjJo6ANi09cjA4vw6A-2nI3RdV6RFRq8zQtvadDlqFKGS4r_Wz4KOzobZ70tIixoI4tHkoslxMwC5ovgVqXbYLHmkHseKwGROo6KfBlMu2LmFPb07awI2HjMQ_ul0lzGp_a4Ni1EiUjCZ9_-w6GwYEO8LAdXmgvxkNu',
  },
  {
    name: 'Nasi Goreng Bawang Putih',
    badge: 'PENGGANJAL PERUT',
    badgeColor: 'bg-primary-light text-foreground',
    time: '8 MIN',
    price: '< Rp 3k',
    tags: ['Nasi Putih', 'Bawang Putih'],
    bg: 'bg-white',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUemeirlcPjGJLscWOst6ee4AY1TJ3iIzIx_mX0ZbA-NYsTOyR6Y01aWIgLMP1LfIdruBaK5W-h7u1SwKGF9Aap0ZF4NvDm73SYAd05Ry77ooGEE57tDY3SQ17PjiwPVNS9xz9ydFCPQOVxB86_9pmtC7pyFHVIDYXVvb5eRa_mqHsNp6ye_hL_6xCK4k5QDbC3cR-8wTE8Oy4KwTAExvTBhno7qDxJdMa7pOGakGAY7LwvA7lh93n',
  },
];

function NumberBadge({ num }) {
  return (
    <div className="absolute -top-6 -right-6 text-[100px] text-foreground/5 font-black pointer-events-none group-hover:rotate-12 transition-transform duration-300 select-none">
      {num}
    </div>
  );
}

function IconBox({ icon: Icon, bgColor }) {
  return (
    <div className={`${bgColor} border-4 border-black w-12 h-12 flex items-center justify-center shadow-neo-sm shrink-0`}>
      <Icon size={24} className="text-white" />
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className={`${recipe.bg} border-4 border-black shadow-neo flex flex-col hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer`}>
      <div className="h-48 border-b-4 border-black relative overflow-hidden bg-muted">
        <img src={recipe.img} alt={recipe.name} className="object-cover w-full h-full" loading="lazy" />
        <div className={`absolute top-3 left-3 ${recipe.badgeColor} border-4 border-black px-2 py-0.5`}>
          <span className="text-xs font-bold uppercase">{recipe.badge}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="font-heading text-lg font-bold uppercase leading-tight">{recipe.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {recipe.tags.map((tag) => (
            <span key={tag} className="border-2 border-black px-2 py-0.5 text-xs font-bold uppercase bg-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-between items-center border-t-4 border-black pt-2">
          <span className="text-xs font-bold flex items-center gap-1">
            <Clock size={14} /> {recipe.time}
          </span>
          <span className="text-xs font-bold flex items-center gap-1">
            <Wallet size={14} /> {recipe.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Split — full width, full screen */}
      <section className="hero-bg min-h-screen border-b-4 border-foreground flex items-center">
        <div className="max-w-[1200px] mx-auto w-full px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4 items-start">
              <div className="hero-badge bg-accent-light border-4 border-foreground px-3 py-1.5 inline-block -rotate-2">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  SURVIVOR MODE ACTIVE
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none text-foreground">
                MASAK ENAK WALAU DOMPET TIPIS
              </h1>
              <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
                Tinggal mie instan dan telur di kosan? Atau sisa sayur layu di kulkas?
                Koki AI kami siap menyulap penderitaan akhir bulanmu menjadi hidangan layak makan.
              </p>
              <button
                onClick={() => navigate('/chat')}
                className="hero-cta mt-2 bg-primary text-white font-bold px-6 py-3 text-lg border-4 border-black shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 uppercase flex items-center gap-2 group"
              >
                MULAI MASAK SEKARANG
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative h-[350px] md:h-full w-full border-4 border-black shadow-neo overflow-hidden bg-muted md:self-stretch">
              <img
                src={landingPageImg}
                alt="Koki Akhir Bulan - Masak Enak Walau Dompet Tipis"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-3 right-3 bg-white border-4 border-black px-3 py-1.5 shadow-neo-sm rotate-3">
                <span className="text-xs font-bold uppercase text-foreground">Sisa Saldo: Rp 15.000,-</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto w-full px-4 py-16 flex flex-col gap-16">
        <section className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: Cpu, label: 'Powered by Google Gemini 2.5 Flash' },
            { icon: ShieldCheck, label: 'AI-Powered Recipe Generator' },
            { icon: Sparkles, label: '100% Gratis' },
          ].map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2 bg-white border-4 border-black px-4 py-2.5 shadow-neo-sm"
            >
              <item.icon size={18} className="text-primary shrink-0" />
              <span className="text-xs font-bold text-foreground">{item.label}</span>
            </div>
          ))}
        </section>

        {/* Teks atau Foto? */}
        <section>
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold uppercase inline-block bg-primary-light border-4 border-black px-4 py-2 -rotate-1 shadow-neo-sm">
              TEKS ATAU FOTO?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ketik */}
            <div className="bg-white border-4 border-black shadow-neo p-6 flex flex-col gap-4 relative overflow-hidden group hover:bg-muted transition-colors">
              <NumberBadge num={1} />
              <IconBox icon={Keyboard} bgColor="bg-secondary" />
              <h3 className="font-heading text-xl font-bold uppercase">Ketik Apa Adanya</h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                Sebutkan bahan apa saja yang tersisa. <em>"Nasi sisa semalam, kecap, bawang merah"</em>.
                Koki akan berikan resep Nasi Goreng Darurat.
              </p>
              <div className="mt-auto bg-muted border-4 border-black p-3 flex items-center gap-2">
                <Search size={14} className="text-foreground/40 shrink-0" />
                <span className="text-xs text-foreground/50 font-mono">Bawang, telur, harapan...</span>
              </div>
            </div>
            {/* Jepret */}
            <div className="bg-primary-light border-4 border-black shadow-neo p-6 flex flex-col gap-4 relative overflow-hidden group hover:bg-primary-light/80 transition-colors">
              <NumberBadge num={2} />
              <IconBox icon={Camera} bgColor="bg-primary" />
              <h3 className="font-heading text-xl font-bold uppercase">Jepret Kulkas Kosongmu</h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                Malas ngetik? Foto saja isi kulkas atau meja dapurmu. AI kami akan mengenali
                bahan-bahan ajaib yang tersembunyi di sudut gelap.
              </p>
              <div className="mt-auto h-16 border-4 border-dashed border-foreground/60 bg-foreground/5 flex items-center justify-center cursor-pointer hover:bg-foreground/10 transition-colors">
                <span className="text-sm font-bold uppercase flex items-center gap-2 text-foreground/60">
                  <Upload size={18} /> Upload Foto
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Resep Darurat Terpopuler */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold uppercase border-b-4 border-foreground pb-2 mb-8 inline-block">
            RESEP DARURAT TERPOPULER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.name} recipe={r} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground border-t-4 border-black">
        <div className="max-w-[1200px] mx-auto w-full px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-heading text-lg text-primary-light uppercase tracking-tight font-black">
              KOKI AKHIR BULAN
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              {['Privacy', 'Terms', 'Support'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs uppercase text-background/50 hover:text-primary-light transition-colors"
                >
                  {l}
                </a>
              ))}
            </nav>
            <div className="text-xs uppercase text-background/50">
              &copy; 2026 KOKI AKHIR BULAN
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
