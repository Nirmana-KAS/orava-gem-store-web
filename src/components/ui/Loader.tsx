export default function Loader() {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-gold">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:120ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:240ms]" />
    </div>
  );
}

