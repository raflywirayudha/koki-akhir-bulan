import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heart, Copy, ShoppingCart } from 'lucide-react';

function SectionDivider() {
  return <hr className="border-border/40 mx-5" />;
}

export default function RecipeCard({ content, recipeId, isFaved, onSave, onShare, onGroceryList }) {
  return (
    <div className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000] overflow-hidden">
      <ReactMarkdown
        components={{
          h2: ({ children, ...props }) => (
            <div className="px-5 pt-5 pb-2" {...props}>
              <h2 className="font-heading text-xl text-primary leading-tight">
                {children}
              </h2>
            </div>
          ),

          h3: ({ children, ...props }) => (
            <>
              <SectionDivider />
              <div className="px-5 pt-4 pb-1" {...props}>
                <h3 className="font-heading text-sm font-bold text-primary flex items-center gap-2">
                  {children}
                </h3>
              </div>
            </>
          ),

          p: ({ children, ...props }) => (
            <p className="px-4 py-4 text-sm text-foreground/80 leading-relaxed" {...props}>
              {children}
            </p>
          ),

          em: ({ children, ...props }) => (
            <>
              <SectionDivider />
              <em className="text-foreground/60 text-sm not-italic block px-5 py-3" {...props}>
                {children}
              </em>
            </>
          ),

          strong: ({ children, ...props }) => (
            <strong className="font-bold text-foreground" {...props}>
              {children}
            </strong>
          ),

          ul: ({ children, ...props }) => {
            const items = React.Children.toArray(children).filter(React.isValidElement);
            return (
              <ul className="px-5 py-3 space-y-2" {...props}>
                {items.map((child, i) => React.cloneElement(child, { index: i, ordered: false }))}
              </ul>
            );
          },

          ol: ({ children, ...props }) => {
            const items = React.Children.toArray(children).filter(React.isValidElement);
            return (
              <ol className="px-5 py-3 space-y-3" {...props}>
                {items.map((child, i) => React.cloneElement(child, { index: i, ordered: true }))}
              </ol>
            );
          },

          li: ({ children, index, ordered, ...props }) => {
            const num = (index ?? 0) + 1;
            if (ordered) {
              return (
                <li className="flex items-start gap-3 text-sm" {...props}>
                  <span className="shrink-0 w-6 h-6 rounded-md border-2 border-black bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {num}
                  </span>
                  <span className="text-foreground/80 pt-0.5 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }
            return (
              <li className="flex items-start gap-2.5 text-sm" {...props}>
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-primary/60" />
                <span className="text-foreground/80 pt-0.5 leading-relaxed">
                  {children}
                </span>
              </li>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      <div className="flex items-center gap-1 px-5 pb-4 pt-2 justify-end border-t-2 border-black/10 mt-2">
        {onGroceryList && (
          <button
            onClick={() => onGroceryList()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-foreground/40 hover:text-primary transition-colors text-xs font-bold"
            aria-label="Daftar belanja"
            title="Buat daftar belanja"
          >
            <ShoppingCart size={14} />
            Belanja
          </button>
        )}
        {onShare && (
          <button
            onClick={() => onShare(content)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-foreground/40 hover:text-primary transition-colors text-xs font-bold"
            aria-label="Salin resep"
            title="Salin resep"
          >
            <Copy size={14} />
            Salin
          </button>
        )}
        {onSave && (
          <button
            onClick={() => onSave(recipeId)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold ${
              isFaved ? 'text-red-500' : 'text-foreground/40 hover:text-red-500'
            }`}
            aria-label={isFaved ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            title={isFaved ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          >
            <Heart size={14} fill={isFaved ? 'currentColor' : 'none'} />
            {isFaved ? 'Tersimpan' : 'Simpan'}
          </button>
        )}
      </div>
    </div>
  );
}
