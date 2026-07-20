import { Sparkles, Flame, Leaf, RefreshCw } from 'lucide-react';

const suggestions = [
  { label: 'Ganti bahan utama', icon: RefreshCw, query: 'Ganti bahan utama dengan alternatif lain' },
  { label: 'Bikin lebih pedas', icon: Flame, query: 'Bikin versi lebih pedas' },
  { label: 'Tambahkan sayur', icon: Leaf, query: 'Tambahkan sayuran lain yang cocok' },
  { label: 'Variasi lain', icon: Sparkles, query: 'Beri variasi resep lain dari bahan yang sama' },
];

export default function FollowUpChips({ onSelect, disabled }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 ml-10">
      {suggestions.map((chip) => {
        const Icon = chip.icon;
        return (
          <button
            key={chip.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(chip.query)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-black/30 text-foreground/60 hover:text-primary hover:border-primary/50 bg-white hover:bg-primary-light/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon size={12} />
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
