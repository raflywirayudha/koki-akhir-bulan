import { useState, useRef } from 'react';
import { Send, ImagePlus, X } from 'lucide-react';

export default function InputArea({
  value,
  onChange,
  onSend,
  loading,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    const trimmed = (value || '').trim();
    if (!trimmed && !imageFile) return;

    onSend({ ingredients: trimmed, imageFile });
    removeImage();
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function autoResize() {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-black bg-white rounded-b-none"
    >
      {preview && (
        <div className="px-4 pt-4">
          <div className="relative inline-block border-2 border-black rounded-xl shadow-[2px_2px_0_0_#000]">
            <img
              src={preview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5 shadow-md hover:bg-red-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 p-4">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Tulis bahan yang ada..."
            rows={1}
            className="w-full resize-none overflow-y-hidden rounded-xl border-2 border-black bg-white text-foreground px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring shadow-[inset_2px_2px_0_0_#000] transition-shadow"
          />
        </div>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          className="text-foreground/40 hover:text-primary rounded-xl p-3 border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Upload foto bahan"
        >
          <ImagePlus size={20} />
        </button>

        <button
          type="submit"
          disabled={loading || (!value?.trim() && !imageFile)}
          className="bg-primary hover:bg-primary-dark disabled:bg-foreground/20 text-white rounded-xl p-3 border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 disabled:cursor-not-allowed active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <Send size={20} />
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </form>
  );
}
