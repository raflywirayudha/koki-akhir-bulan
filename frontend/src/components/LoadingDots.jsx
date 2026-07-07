export default function LoadingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-xl rounded-bl-md px-4 py-4 border-2 border-black shadow-[3px_3px_0_0_#000]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
