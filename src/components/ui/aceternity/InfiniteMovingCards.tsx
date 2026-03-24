"use client";

interface InfiniteMovingCardsProps {
  items: { quote: string; author: string; company: string }[];
}

function CardRow({
  items,
  reverse = false,
}: {
  items: InfiniteMovingCardsProps["items"];
  reverse?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((item, index) => (
          <article
            key={`${item.author}-${index}`}
            className="w-[360px] rounded-2xl border border-[#dde2e8] bg-white p-5 shadow-sm"
          >
            <p className="text-[#4a4a6a]">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-3 font-semibold text-[#3c74ae]">{item.author}</p>
            <p className="text-sm text-[#8f8b8f]">{item.company}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function InfiniteMovingCards({ items }: InfiniteMovingCardsProps) {
  return (
    <div className="space-y-2">
      <CardRow items={items} />
      <CardRow items={[...items].reverse()} reverse />
    </div>
  );
}
