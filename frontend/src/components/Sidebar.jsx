import { useState } from 'react';
import { Plus, Trash2, X, PanelLeftClose, PanelLeftOpen, Heart, MessageCircle } from 'lucide-react';

function SidebarContent({ sessions, activeId, onSelect, onNewChat, onDelete, onDeleteAll, onClose, onToggle, favorites, onSelectFavorite }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const nonEmpty = sessions.filter((s) => s.messages.length > 0);

  return (
    <>
      <div className="px-1.5 pt-4 flex items-center gap-2">
        
        <button
          onClick={onNewChat}
          className="flex-1 flex items-center gap-2 p-2  border-2 border-black bg-primary text-white font-bold text-sm shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200"
        >
          <Plus size={24} />
          Percakapan baru
        </button>
        <button
          onClick={onClose}
          className="hidden md:block p-2 border-2 border-black  hover:bg-muted shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200"
          aria-label="Tutup sidebar"
        >
          <PanelLeftClose size={24} />
        </button>
        <button
          onClick={onClose}
          className="md:hidden p-2  border-2 border-black text-foreground/40 hover:text-foreground hover:bg-muted shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200 shrink-0"
          aria-label="Tutup sidebar"
        >
          <X size={24} />
        </button>
      </div>

      
      {favorites && favorites.length > 0 && (
        <div className="px-3 pt-2">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="w-full flex items-center gap-2 px-3 py-2  text-xs font-bold text-foreground/50 hover:text-primary hover:bg-primary-light/10 transition-all"
          >
            <Heart size={14} className={showFavorites ? 'text-red-500' : ''} />
            Resep Tersimpan ({favorites.length})
          </button>
          {showFavorites && (
            <div className="mt-1 space-y-1">
              {favorites.map((fav) => (
                <button
                  key={fav.id}
                  onClick={() => onSelectFavorite?.(fav)}
                  className="w-full flex items-center gap-2 px-3 py-1.5  text-xs text-foreground/60 hover:text-foreground hover:bg-muted transition-all text-left"
                >
                  <MessageCircle size={12} className="shrink-0" />
                  <span className="truncate">{fav.title || 'Resep'}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {nonEmpty.length === 0 ? (
          <p className="text-xs text-foreground/30 text-center py-4">
            Belum ada percakapan
          </p>
        ) : nonEmpty.map((s) => {
          const active = s.id === activeId;
          return (
            <div
              key={s.id}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2.5  cursor-pointer text-sm transition-all duration-200 border-2 ${
                active
                  ? 'bg-primary/10 text-primary border-primary/30 font-bold'
                  : 'text-foreground/60 hover:text-foreground border-transparent hover:border-border/60'
              }`}
              onClick={() => {
                onSelect(s.id);
                if (window.innerWidth < 768) onClose();
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="truncate">{s.title}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget(s.id);
                }}
                className="shrink-0 p-1  text-foreground/20 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Hapus sesi"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {nonEmpty.length > 0 && (
        <div className="px-3 pb-3 pt-3">
          <button
            onClick={() => setShowDeleteAll(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2  text-xs font-bold text-foreground/40 hover:text-destructive hover:bg-destructive/10 border-2 border-transparent hover:border-destructive/30 transition-all"
          >
            <Trash2 size={12} />
            Hapus Semua
          </button>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/30" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white  border-2 border-black shadow-[4px_4px_0_0_#000] p-6 max-w-sm w-full">
            <h3 className="font-heading text-lg text-foreground">Hapus Sesi?</h3>
            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
              Semua pesan dalam sesi ini akan dihapus.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5  border-2 border-black text-sm font-bold text-foreground bg-white hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDelete(deleteTarget);
                  setDeleteTarget(null);
                }}
                className="flex-1 py-2.5  border-2 border-black text-sm font-bold text-white bg-destructive hover:bg-red-700 shadow-[2px_2px_0_0_#000] transition-all"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteAll && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/30" onClick={() => setShowDeleteAll(false)} />
          <div className="relative bg-white  border-2 border-black shadow-[4px_4px_0_0_#000] p-6 max-w-sm w-full">
            <h3 className="font-heading text-lg text-foreground">Hapus Semua Sesi?</h3>
            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
              Semua riwayat percakapan akan dihapus. Sesi baru akan dibuat otomatis.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowDeleteAll(false)}
                className="flex-1 py-2.5  border-2 border-black text-sm font-bold text-foreground bg-white hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteAll();
                  setShowDeleteAll(false);
                }}
                className="flex-1 py-2.5  border-2 border-black text-sm font-bold text-white bg-destructive hover:bg-red-700 shadow-[2px_2px_0_0_#000] transition-all"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Sidebar(props) {
  const { open, onClose, onToggle } = props;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[55] bg-black/30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          md:hidden fixed inset-y-0 left-0 z-[60] w-64
          bg-white border-r-2 border-black flex flex-col
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent {...props} />
      </aside>

      <div
        className={`
          hidden md:flex flex-col shrink-0 h-full
          bg-white border-r-2 border-black 
          overflow-hidden transition-all duration-200 items-center
          ${open ? 'w-72' : 'w-14'}
        `}
      >
        {open ? (
          <div className="w-72 min-w-72 h-full flex flex-col">
            <SidebarContent {...props} />
          </div>
        ) : (
          <div className="w-12 min-w-12 h-full flex flex-col items-center gap-2 p-4 mr-0.5">
            <button
              onClick={onToggle}
              className="p-2 border-2 border-black hover:bg-muted shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none  transition-all"
              aria-label="Buka sidebar"
            >
              <PanelLeftOpen size={24} />
            </button>
            <button
              onClick={props.onNewChat}
              className="p-2  border-2 border-black bg-primary text-white shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              aria-label="New Chat"
            >
              <Plus size={24} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
