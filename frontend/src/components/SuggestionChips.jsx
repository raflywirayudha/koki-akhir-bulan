import { useRef } from 'react';
import { ChefHat } from 'lucide-react';

const suggestions = [
  'Telur', 'Nasi', 'Mie Instan', 'Kentang',
  'Tahu', 'Tempe', 'Ayam', 'Sayur',
  'Bawang', 'Tomat', 'Cabai', 'Kornet',
];

export default function SuggestionChips({ selectedChips, onToggle, disabled }) {
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth pb-2 px-1 -mx-1 [&::-webkit-scrollbar]:hidden"
      >
        {suggestions.map((chip) => {
          const selected = selectedChips.has(chip);
          return (
            <button
              key={chip}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(chip)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  selected
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0_0_#000]'
                    : 'bg-primary-light/60 text-primary border-transparent hover:bg-primary hover:text-white hover:border-black'
                }`}
            >
              <ChefHat size={14} />
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
