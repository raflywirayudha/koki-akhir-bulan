import { useEffect, useRef } from 'react';
import { MessageCircle, RotateCcw } from 'lucide-react';
import ChatBubble from './ChatBubble';
import LoadingDots from './LoadingDots';

export default function ChatLayout({ messages, loading, onRegenerate, hasLastIngredients }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  const lastBotIndex = messages.length > 0
    ? messages.reduce((last, msg, i) => (msg.role === 'bot' ? i : last), -1)
    : -1;

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
    >
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-foreground/40">
            <div className="w-20 h-20 rounded-xl border-2 border-black bg-primary text-white flex items-center justify-center mb-4 shadow-[3px_3px_0_0_#000]">
              <MessageCircle size={36} />
            </div>
            <p className="text-sm font-bold text-foreground/50">
              Ada bahan apa saja di dapurmu?
            </p>
            <p className="text-xs mt-1 text-foreground/30">
              Klik bahan di atas atau ketik manual
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isLastBot = i === lastBotIndex && msg.role === 'bot';
          return (
            <div key={i}>
              <ChatBubble message={msg} />
              {isLastBot && !loading && (
                <div className="flex justify-start ml-10 mt-2">
                  <button
                    onClick={onRegenerate}
                    disabled={!hasLastIngredients}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <RotateCcw size={12} />
                    Coba Resep Lain
                  </button>
                </div>
              )}
              {i < messages.length - 1 && messages[i + 1]?.role === 'user' && (
                <hr className="border-border/40 my-4" />
              )}
            </div>
          );
        })}

        {loading && <LoadingDots />}
      </div>
  );
}
