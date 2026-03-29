import { useState } from "react";
import Icon from "@/components/ui/icon";

const favoritesData = [
  {
    id: 1, type: "task", subject: "Математика", emoji: "📐",
    title: "Задача на проценты", number: 4,
    desc: "Цена товара снизилась на 20%, а затем ещё раз снизилась на 25%...",
    colorClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 2, type: "formula", subject: "Математика", emoji: "📐",
    title: "Формулы сокращённого умножения",
    desc: "(a+b)² = a² + 2ab + b², (a−b)² = a² − 2ab + b²...",
    colorClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 3, type: "task", subject: "Русский язык", emoji: "📖",
    title: "НЕ с прилагательными", number: 8,
    desc: "Укажите варианты с слитным написанием НЕ...",
    colorClass: "text-amber-400", bgClass: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: 4, type: "solution", subject: "Физика", emoji: "⚛️",
    title: "Разбор: равноускоренное движение",
    desc: "Пошаговый разбор задачи с автомобилем и формулами кинематики...",
    colorClass: "text-violet-400", bgClass: "bg-violet-500/10 border-violet-500/20",
  },
  {
    id: 5, type: "formula", subject: "Физика", emoji: "⚛️",
    title: "Законы Ньютона",
    desc: "I, II, III законы механики с формулами и пояснениями...",
    colorClass: "text-violet-400", bgClass: "bg-violet-500/10 border-violet-500/20",
  },
];

const typeLabels = {
  task: { label: "Задание", icon: "FileText", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  formula: { label: "Формула", icon: "Sigma", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  solution: { label: "Разбор", icon: "Lightbulb", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoritesData);
  const [filter, setFilter] = useState<"all" | "task" | "formula" | "solution">("all");

  const filtered = favorites.filter((f) => filter === "all" || f.type === filter);

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Избранное</h1>
          <p className="text-muted-foreground">Сохранённые задания, формулы и разборы для быстрого доступа</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap animate-fade-in-up stagger-1">
          {[
            { value: "all", label: `Все (${favorites.length})` },
            { value: "task", label: "Задания" },
            { value: "formula", label: "Формулы" },
            { value: "solution", label: "Разборы" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border
                ${filter === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 animate-fade-in-up">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Избранное пусто</h2>
            <p className="text-muted-foreground">Добавляйте задания и формулы в избранное для быстрого доступа</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => {
              const typeConfig = typeLabels[item.type as keyof typeof typeLabels];
              return (
                <div
                  key={item.id}
                  className={`group p-5 rounded-2xl border ${item.bgClass} card-hover animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <span className="text-xs text-muted-foreground">{item.subject}</span>
                        {(item as { number?: number }).number && (
                          <span className="text-xs text-muted-foreground font-mono-code ml-1">
                            №{(item as { number?: number }).number}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-background/50 text-muted-foreground hover:text-rose-400 transition-all duration-200"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>

                  <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border mb-3 ${typeConfig.bg} ${typeConfig.color}`}>
                    <Icon name={typeConfig.icon} size={11} />
                    {typeConfig.label}
                  </div>

                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.desc}</p>

                  <button className={`mt-3 text-xs font-medium flex items-center gap-1 ${item.colorClass} hover:opacity-80 transition-opacity`}>
                    Открыть <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-8 p-4 rounded-xl border border-border bg-card/50 flex items-center justify-between animate-fade-in-up">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Info" size={14} />
              Всего сохранено: {favorites.length} материалов
            </div>
            <button
              onClick={() => setFavorites([])}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              Очистить всё
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
