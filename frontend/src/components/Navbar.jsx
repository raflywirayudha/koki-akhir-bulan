import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import logoImg from '../assets/logo.png';
import titleImg from '../assets/title.png';
import useTheme from '../hooks/useTheme';

const themes = [
  { id: 'warm', color: 'bg-[#EA580C]' },
  { id: 'garden', color: 'bg-[#16A34A]' },
  { id: 'retro', color: 'bg-[#E11D48]' },
  { id: 'edgy', color: 'bg-[#695f00]' },
  { id: 'playful', color: 'bg-[#36EC95]' },
];

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-neo">
      <div className="max-w-[1200px] mx-auto w-full px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isChat && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-1.5 text-foreground/30 hover:text-foreground transition-colors shrink-0"
              aria-label={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-0 hover:opacity-80 transition-opacity shrink-0"
          >
            <img src={logoImg} alt="" className="h-11 w-auto" />
            <img src={titleImg} alt="Koki Akhir Bulan" className="h-9 w-auto" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-5 h-5 border-2 transition-all duration-200 ${
                  theme === t.id
                    ? 'border-black shadow-[2px_2px_0_0_#000] scale-110'
                    : 'border-transparent hover:border-black opacity-50 hover:opacity-100'
                } ${t.color}`}
                aria-label={`Theme ${t.id}`}
              />
            ))}
          </div>

          {!isChat && (
            <button
              onClick={() => navigate('/chat')}
              className="bg-primary text-white font-bold px-5 py-2 text-sm border-4 border-black shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 uppercase flex items-center gap-2"
            >
              Mulai Memasak
              <ArrowRight size={18} />
            </button>
          )}

        </div>

        <button
          className="md:hidden p-2 border-4 border-black text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-4 border-black bg-white px-4 pb-4 pt-2 space-y-2">
          <button
            onClick={() => { navigate('/chat'); setOpen(false); }}
            className="w-full bg-primary text-white font-bold px-4 py-3 text-sm border-4 border-black shadow-neo-sm transition-all duration-200 uppercase flex items-center justify-center gap-2"
          >
            Mulai Memasak
            <ArrowRight size={18} />
          </button>

          <div className="flex items-center gap-3 px-2 py-2">
            <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Tema</span>
            <div className="flex items-center gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); }}
                  className={`w-6 h-6 border-2 transition-all duration-200 ${
                    theme === t.id
                      ? 'border-black shadow-[2px_2px_0_0_#000] scale-110'
                      : 'border-transparent hover:border-black opacity-50 hover:opacity-100'
                  } ${t.color}`}
                  aria-label={`Theme ${t.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
