import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import titleImg from '../assets/title.png';
import useTheme from '../hooks/useTheme';

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/chat', label: 'Chat' },
];

const themes = [
  { id: 'warm', color: 'bg-[#EA580C]' },
  { id: 'garden', color: 'bg-[#16A34A]' },
  { id: 'retro', color: 'bg-[#E11D48]' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-0 hover:opacity-80 transition-opacity"
        >
          <img src={logoImg} alt="" className="h-12 w-auto" />
          <img src={titleImg} alt="Koki Akhir Bulan" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white border-2 border-black shadow-[3px_3px_0_0_#000]'
                    : 'text-foreground/60 hover:text-primary hover:bg-primary-light/60 border-2 border-transparent hover:border-black'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-1.5 ml-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                  theme === t.id
                    ? 'border-black shadow-[2px_2px_0_0_#000] scale-110'
                    : 'border-transparent hover:border-black opacity-50 hover:opacity-100'
                } ${t.color}`}
                aria-label={`Theme ${t.id}`}
              />
            ))}
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-xl border-2 border-black text-foreground/60 hover:text-primary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-black bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white border-2 border-black shadow-[3px_3px_0_0_#000]'
                    : 'text-foreground/60 hover:text-primary hover:bg-primary-light/60 border-2 border-transparent hover:border-black'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Tema</span>
            <div className="flex items-center gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); }}
                  className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
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
    </nav>
  );
}
