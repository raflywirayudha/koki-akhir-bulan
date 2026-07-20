import { useState, useCallback, useRef, useEffect } from 'react';
import useSessions from '../hooks/useSessions';
import useFavorites from '../hooks/useFavorites';
import Sidebar from '../components/Sidebar';
import ChatLayout from '../components/ChatLayout';
import InputArea from '../components/InputArea';
import SuggestionChips from '../components/SuggestionChips';

export default function Chat({ sidebarOpen, onCloseSidebar, onToggleSidebar }) {
  const {
    sessions, activeId, activeSession,
    setActiveId, addSession, deleteSession, deleteAllSessions, updateSession,
  } = useSessions();

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [preferences, setPreferences] = useState('');

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
      if (preferences) formData.append('preferences', preferences);

      const history = messagesRef.current.slice(-20).map((msg) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        text: msg.content,
      }));
      formData.append('history', JSON.stringify(history));

      const context = sessions
        .filter((s) => s.id !== activeIdRef.current && s.messages.length > 0 && s.title !== 'Resep Baru')
        .slice(0, 3)
        .map((s) => `- ${s.title}`)
        .join('\n');
      if (context) {
        formData.append('context', context);
      }

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
        const match = data.recipe.match(/^## (.+)$/m);
        const title = match ? match[1].trim() : (userContent.split(',').slice(0, 2).join(', ').trim() || userContent.slice(0, 30));
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
  }, [inputText, updateSession, sessions, preferences]);

  const handleSubmit = useCallback(
    ({ ingredients, imageFile }) => {
      const userText = ingredients ?? inputText;
      handleSend({ ingredients: userText, imageFile });
    },
    [inputText, handleSend]
  );

  const handleChipToggle = useCallback((chip) => {
    if (chip === 'Saya mau masak...') {
      setSelectedChips(new Set());
      setInputText('Saya mau masak ');
      return;
    }
    if (chip === 'Saya bingung 🎲') {
      setSelectedChips(new Set());
      setInputText('');
      handleSend({ ingredients: 'Saya bingung, saranin resep random', imageFile: null });
      return;
    }
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
  }, [handleSend]);

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
    if (preferences) formData.append('preferences', preferences);

    const history = messagesRef.current.slice(-20).map((msg) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      text: msg.content,
    }));
    formData.append('history', JSON.stringify(history));

    const context = sessions
      .filter((s) => s.id !== currentId && s.messages.length > 0 && s.title !== 'Resep Baru')
      .slice(0, 3)
      .map((s) => `- ${s.title}`)
      .join('\n');
    if (context) {
      formData.append('context', context);
    }

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
  }, [lastIngredients, updateSession, sessions, preferences]);

  const handleFollowUp = useCallback((query) => {
    handleSend({ ingredients: query, imageFile: null });
  }, [handleSend]);

  const recipeIdMap = {};
  messages.forEach((msg, i) => {
    if (msg.role === 'bot' && /\n## .+/m.test(msg.content)) {
      recipeIdMap[i] = `recipe-${activeId}-${i}`;
    }
  });

  const handleSaveFavorite = useCallback((recipeId) => {
    const idx = messages.findIndex((_, i) => recipeIdMap[i] === recipeId);
    if (idx === -1) return;
    const recipe = { id: recipeId, content: messages[idx].content, title: messages[idx].content.match(/^## (.+)$/m)?.[1] || 'Resep', sessionId: activeId };
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipe);
    }
  }, [messages, recipeIdMap, activeId, isFavorite, addFavorite, removeFavorite]);

  const handleShare = useCallback(async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      alert('Resep disalin ke clipboard!');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Resep disalin ke clipboard!');
    }
  }, []);

  const handleGroceryList = useCallback(() => {
    handleSend({ ingredients: 'Buatkan daftar belanja dari resep terakhir', imageFile: null });
  }, [handleSend]);

  const handleNewChat = useCallback(() => {
    addSession();
  }, [addSession]);

  return (
    <div className="w-full flex h-[calc(100vh-4rem)]">
        <Sidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onNewChat={handleNewChat}
          onDelete={deleteSession}
          onDeleteAll={deleteAllSessions}
          open={sidebarOpen}
          onClose={onCloseSidebar}
          onToggle={onToggleSidebar}
          favorites={favorites}
          preferences={preferences}
          onPreferencesChange={setPreferences}
        />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden rounded-xl bg-white border-2 border-black shadow-[4px_4px_0_0_#000] m-4">
        <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b-2 border-black">
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
          onFollowUp={handleFollowUp}
          recipeIdMap={recipeIdMap}
          isFaved={isFavorite}
          onSave={handleSaveFavorite}
          onShare={handleShare}
          onGroceryList={handleGroceryList}
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
