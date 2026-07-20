import { useRef } from 'react';

const suggestions = [
  { label: 'Telur', emoji: '🥚' },
  { label: 'Nasi', emoji: '🍚' },
  { label: 'Mie Instan', emoji: '🍜' },
  { label: 'Kentang', emoji: '🥔' },
  { label: 'Tahu', emoji: '🫘' },
  { label: 'Tempe', emoji: '🧈' },
  { label: 'Ayam', emoji: '🍗' },
  { label: 'Sayur', emoji: '🥬' },
  { label: 'Bawang', emoji: '🧅' },
  { label: 'Tomat', emoji: '🍅' },
  { label: 'Cabai', emoji: '🌶️' },
  { label: 'Kornet', emoji: '🥫' },
  { label: 'Saya mau masak...', emoji: '🔍' },
  { label: 'Saya bingung 🎲', emoji: '🎲' },
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
          const selected = selectedChips.has(chip.label);
          return (
            <button
              key={chip.label}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(chip.label)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  selected
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0_0_#000]'
                    : 'bg-primary-light/60 text-primary border-transparent hover:bg-primary hover:text-white hover:border-black'
                }`}
            >
              <span className="text-base">{chip.emoji}</span>
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
