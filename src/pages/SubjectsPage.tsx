import { useState } from "react";
import Icon from "@/components/ui/icon";
import { subjects } from "@/data/subjects";

interface SubjectsPageProps {
  onNavigate: (section: string, params?: Record<string, string>) => void;
}

export default function SubjectsPage({ onNavigate }: SubjectsPageProps) {
  const [filter, setFilter] = useState<"all" | "ЕГЭ" | "ОГЭ">("all");
  const [search, setSearch] = useState("");

  const filtered = subjects.filter((s) => {
    const matchFilter = filter === "all" || s.examType.includes(filter);
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Предметы</h1>
          <p className="text-muted-foreground">Выберите предмет для изучения заданий и справочных материалов</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up stagger-1">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск предмета..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "ЕГЭ", "ОГЭ"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {f === "all" ? "Все" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((subject, i) => (
            <div
              key={subject.id}
              className={`group p-6 rounded-2xl border ${subject.bgClass} card-hover cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => onNavigate("tasks")}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{subject.emoji}</span>
                <div className="flex gap-1">
                  {subject.examType.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${t === "ЕГЭ" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{subject.name}</h3>
              <p className={`text-sm font-mono-code mb-4 ${subject.colorClass}`}>
                {subject.taskCount} заданий
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {subject.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="text-xs px-2 py-0.5 rounded-md bg-background/50 text-muted-foreground border border-border">
                    {topic}
                  </span>
                ))}
                {subject.topics.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-background/50 text-muted-foreground border border-border">
                    +{subject.topics.length - 3}
                  </span>
                )}
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Прогресс</span>
                  <span className={`font-medium ${subject.colorClass}`}>{subject.progress}%</span>
                </div>
                <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                  <div className="progress-bar h-full" style={{ width: `${subject.progress}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                <span>Перейти к заданиям</span>
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
