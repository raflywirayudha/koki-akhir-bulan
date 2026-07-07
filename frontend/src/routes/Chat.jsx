import { useState, useCallback } from 'react';
import ChatLayout from '../components/ChatLayout';
import InputArea from '../components/InputArea';
import SuggestionChips from '../components/SuggestionChips';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [lastIngredients, setLastIngredients] = useState(null);

  const handleSend = useCallback(async ({ ingredients, imageFile }) => {
    const userContent = (ingredients || inputText).trim();
    if (!userContent && !imageFile) return;

    setMessages((prev) => [...prev, { role: 'user', content: userContent + (imageFile ? ' (+ foto)' : '') }]);
    setLoading(true);
    setLastIngredients(userContent);

    try {
      const formData = new FormData();
      formData.append('ingredients', userContent);
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gagal mendapatkan resep');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.recipe }]);
      setInputText('');
      setSelectedChips(new Set());
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: e.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [inputText]);

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
    if (!lastIngredients) return;
    setMessages((prev) => [...prev, { role: 'user', content: lastIngredients + ' 🔄 (coba lagi)' }]);
    setLoading(true);

    const formData = new FormData();
    formData.append('ingredients', lastIngredients);

    fetch('/api/generate-recipe', { method: 'POST', body: formData })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Gagal mendapatkan resep');
        }
        return res.json();
      })
      .then((data) => {
        setMessages((prev) => [...prev, { role: 'bot', content: data.recipe }]);
      })
      .catch((e) => {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: e.message },
        ]);
      })
      .finally(() => setLoading(false));
  }, [lastIngredients]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-4 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col overflow-hidden rounded-xl bg-white border-2 border-black shadow-[4px_4px_0_0_#000]">
        <div className="px-4 pt-4">
          <SuggestionChips
            selectedChips={selectedChips}
            onToggle={handleChipToggle}
            disabled={loading}
          />
        </div>
        <ChatLayout
          messages={messages}
          loading={loading}
          onRegenerate={handleRegenerate}
          hasLastIngredients={!!lastIngredients}
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
