interface NewsCategoryProps {
  title: string;
  icon: React.ReactNode;
  lastUpdate: string;
  backgroundColor: string;
  items: {
    id: number;
    title: string;
    points?: number;
    stars?: number;
  }[];
}

export default function NewsCategory({ title, icon, lastUpdate, backgroundColor, items }: NewsCategoryProps) {
  return (
    <div className={`rounded-xl p-4 ${backgroundColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-white font-semibold">{title}</h2>
        </div>
        <div className="text-white/70 text-sm">{lastUpdate}</div>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="text-white/70 min-w-[1.5rem]">{item.id}</span>
            <div className="flex-1">
              <p className="text-white">{item.title}</p>
              {item.points && <span className="text-white/60 text-sm">{item.points} points</span>}
              {item.stars && <span className="text-white/60 text-sm">★ {item.stars}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 