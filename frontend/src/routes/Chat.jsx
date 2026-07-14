import { useState, useCallback, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import useSessions from '../hooks/useSessions';
import Sidebar from '../components/Sidebar';
import ChatLayout from '../components/ChatLayout';
import InputArea from '../components/InputArea';
import SuggestionChips from '../components/SuggestionChips';

export default function Chat() {
  const {
    sessions, activeId, activeSession,
    setActiveId, addSession, deleteSession, deleteAllSessions, updateSession,
  } = useSessions();

  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messages = activeSession?.messages || [];
  const lastIngredients = activeSession?.lastIngredients || null;

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const imageFilesRef = useRef({});
  const activeIdRef = useRef(activeId);
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  const handleSend = useCallback(async ({ ingredients, imageFile }) => {
    const userContent = (ingredients || inputText).trim();
    if (!userContent && !imageFile) return;

    const currentId = activeIdRef.current;
    if (!currentId) return;

    const userMsg = { role: 'user', content: userContent + (imageFile ? ' (+ foto)' : '') };
    const updatedMessages = [...messagesRef.current, userMsg];

    if (imageFile) {
      imageFilesRef.current[currentId] = imageFile;
    }

    updateSession(currentId, {
      messages: updatedMessages,
      lastIngredients: { text: userContent, imageFile: null },
    });

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('ingredients', userContent);
      if (imageFile) formData.append('image', imageFile);

      const history = messagesRef.current.slice(-20).map((msg) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        text: msg.content,
      }));
      formData.append('history', JSON.stringify(history));

      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gagal mendapatkan resep');
      }

      const data = await res.json();
      const finalMessages = [...updatedMessages, { role: 'bot', content: data.recipe }];
      updateSession(currentId, { messages: finalMessages });

      const s = sessions.find((x) => x.id === currentId);
      if (s && s.title === 'Resep Baru') {
        const title = userContent.split(',').slice(0, 2).join(', ').trim() || userContent.slice(0, 30);
        updateSession(currentId, { title });
      }

      setInputText('');
      setSelectedChips(new Set());
    } catch (e) {
      updateSession(currentId, {
        messages: [...updatedMessages, { role: 'bot', content: e.message }],
      });
    } finally {
      setLoading(false);
    }
  }, [inputText, updateSession, sessions]);

  const handleChipToggle = useCallback((chip) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) {
        next.delete(chip);
      } else {
        next.add(chip);
      }
      setInputText(Array.from(next).join(', '));
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    ({ ingredients, imageFile }) => {
      const userText = ingredients ?? inputText;
      handleSend({ ingredients: userText, imageFile });
    },
    [inputText, handleSend]
  );

  const handleRegenerate = useCallback(() => {
    if (!lastIngredients?.text) return;
    const { text } = lastIngredients;
    const currentId = activeIdRef.current;
    if (!currentId) return;

    const imageFile = imageFilesRef.current[currentId] || null;

    const userMsg = { role: 'user', content: text + ' 🔄 (coba lagi)' };
    const updatedMessages = [...messagesRef.current, userMsg];
    updateSession(currentId, { messages: updatedMessages });
    setLoading(true);

    const formData = new FormData();
    formData.append('ingredients', text);
    if (imageFile) formData.append('image', imageFile);

    const history = messagesRef.current.slice(-20).map((msg) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      text: msg.content,
    }));
    formData.append('history', JSON.stringify(history));

    setInputText('');
    setSelectedChips(new Set());

    fetch('/api/generate-recipe', { method: 'POST', body: formData })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Gagal mendapatkan resep');
        }
        return res.json();
      })
      .then((data) => {
        updateSession(currentId, {
          messages: [...updatedMessages, { role: 'bot', content: data.recipe }],
        });
      })
      .catch((e) => {
        updateSession(currentId, {
          messages: [...updatedMessages, { role: 'bot', content: e.message }],
        });
      })
      .finally(() => setLoading(false));
  }, [lastIngredients, updateSession]);

  const handleNewChat = useCallback(() => {
    addSession();
  }, [addSession]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-4 pb-4 flex h-[calc(100vh-4rem)] gap-4">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={handleNewChat}
        onDelete={deleteSession}
        onDeleteAll={deleteAllSessions}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden rounded-xl bg-white border-2 border-black shadow-[4px_4px_0_0_#000]">
        <div className="flex items-center gap-2 px-4 pt-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-foreground/30 hover:text-foreground transition-colors -ml-1"
            aria-label="Buka sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <SuggestionChips
              selectedChips={selectedChips}
              onToggle={handleChipToggle}
              disabled={loading}
            />
          </div>
        </div>
        <ChatLayout
          messages={messages}
          loading={loading}
          onRegenerate={handleRegenerate}
          hasLastIngredients={!!lastIngredients?.text}
        />
        <InputArea
          value={inputText}
          onChange={setInputText}
          onSend={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
