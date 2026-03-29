import { useState } from "react";
import Icon from "@/components/ui/icon";
import { subjects, referenceItems } from "@/data/subjects";

const extraItems = [
  {
    id: 5, subjectId: "physics", title: "Формулы кинематики",
    content: "v = v₀ + at\nS = v₀t + at²/2\nv² = v₀² + 2aS\nS = (v₀ + v)/2 × t",
    category: "Механика",
  },
  {
    id: 6, subjectId: "chemistry", title: "Периодический закон",
    content: "Свойства элементов периодически повторяются с увеличением атомного номера.\nВ периоде: металлические свойства убывают →\nВ группе: металлические свойства возрастают ↓",
    category: "Общая химия",
  },
  {
    id: 7, subjectId: "russian", title: "Суффиксы причастий",
    content: "Действительные наст. вр.: -ущ-, -ющ- (I спр.), -ащ-, -ящ- (II спр.)\nДействительные пр. вр.: -вш-, -ш-\nСтрадательные наст. вр.: -ем-, -ом- (I спр.), -им- (II спр.)\nСтрадательные пр. вр.: -нн-, -енн-, -т-",
    category: "Морфология",
  },
  {
    id: 8, subjectId: "biology", title: "Митоз vs Мейоз",
    content: "МИТОЗ:\n• 1 деление, 2 дочерние клетки\n• Набор хромосом: 2n → 2n\n• Соматические клетки\n\nМЕЙОЗ:\n• 2 деления, 4 клетки\n• Набор хромосом: 2n → n\n• Половые клетки",
    category: "Клетка",
  },
];

const allItems = [...referenceItems, ...extraItems];

export default function ReferencePage() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const filtered = allItems.filter((item) => {
    const subjectMatch = selectedSubject === "all" || item.subjectId === selectedSubject;
    const searchMatch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return subjectMatch && searchMatch;
  });

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const grouped = filtered.reduce((acc, item) => {
    const subj = subjects.find((s) => s.id === item.subjectId);
    const key = subj ? `${subj.emoji} ${subj.name}` : "Другое";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof filtered>);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Справочник</h1>
          <p className="text-muted-foreground">Формулы, правила и таблицы для быстрого повторения</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up stagger-1">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по формулам и правилам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
          >
            <option value="all">Все предметы</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
            ))}
          </select>
        </div>

        {Object.entries(grouped).length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-muted-foreground">Ничего не найдено</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([groupName, items]) => (
              <div key={groupName} className="animate-fade-in-up">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  {groupName}
                  <span className="text-xs font-normal text-muted-foreground font-mono-code">{items.length} материалов</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item, i) => {
                    const subj = subjects.find((s) => s.id === item.subjectId);
                    return (
                      <div
                        key={item.id}
                        className={`group relative p-5 rounded-2xl border bg-card card-hover animate-fade-in-up ${subj?.bgClass || "border-border"}`}
                        style={{ animationDelay: `${i * 0.07}s` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${subj?.bgClass || "bg-secondary border-border"} ${subj?.colorClass || "text-muted-foreground"} border`}>
                              {item.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(item.id, item.content)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
                          >
                            <Icon name={copied === item.id ? "Check" : "Copy"} size={14} className={copied === item.id ? "text-emerald-400" : ""} />
                          </button>
                        </div>

                        <h3 className="font-bold text-foreground mb-3">{item.title}</h3>

                        <pre className={`text-sm font-mono-code whitespace-pre-wrap leading-relaxed p-3 rounded-xl bg-background/50 border border-border ${subj?.colorClass ? "text-foreground" : "text-muted-foreground"}`}>
                          {item.content}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
