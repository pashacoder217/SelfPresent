interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-neutral-700"></div>
        <span className="mx-3 shrink text-sm leading-8 text-neutral-500">
          {text}
        </span>
        <div className="grow border-t border-neutral-700"></div>
      </div>
    </div>
  );
}
