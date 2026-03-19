interface ColorSwatchProps {
  hex: string;
  label?: string;
}

export default function ColorSwatch({ hex, label }: ColorSwatchProps) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-zinc-300">
      <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: hex }} />
      {label ? <span>{label}</span> : null}
    </span>
  );
}

