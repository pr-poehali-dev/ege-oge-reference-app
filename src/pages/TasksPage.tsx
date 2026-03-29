import { useState } from "react";
import Icon from "@/components/ui/icon";
import { subjects, tasks } from "@/data/subjects";

const allTasks = [
  ...tasks,
  {
    id: 4, subjectId: "physics", number: 3, title: "Закон Ома", difficulty: "easy", type: "ЕГЭ",
    description: "В цепи с напряжением 12 В и сопротивлением 4 Ом найдите силу тока.",
    answer: "3 А", explanation: "По закону Ома: I = U/R = 12/4 = 3 А", tags: ["электричество", "закон Ома"],
  },
  {
    id: 5, subjectId: "chemistry", number: 7, title: "Типы реакций", difficulty: "medium", type: "ЕГЭ",
    description: "Какой тип реакции: 2H₂ + O₂ → 2H₂O?",
    answer: "Реакция соединения", explanation: "Из двух простых веществ образуется одно сложное — реакция соединения.", tags: ["типы реакций"],
  },
  {
    id: 6, subjectId: "biology", number: 2, title: "Митоз и мейоз", difficulty: "hard", type: "ЕГЭ",
    description: "В клетке 46 хромосом. Сколько хромосом в каждой дочерней клетке после митоза?",
    answer: "46", explanation: "При митозе количество хромосом не меняется — каждая дочерняя клетка получает по 46 хромосом.", tags: ["клетка", "деление"],
  },
];

const difficultyConfig = {
  easy: { label: "Лёгкое", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  medium: { label: "Среднее", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  hard: { label: "Сложное", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
};

export default function TasksPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [openTask, setOpenTask] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = allTasks.filter((t) => {
    const subjectMatch = selectedSubject === "all" || t.subjectId === selectedSubject;
    const diffMatch = selectedDifficulty === "all" || t.difficulty === selectedDifficulty;
    return subjectMatch && diffMatch;
  });

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Задания</h1>
          <p className="text-muted-foreground">База заданий ЕГЭ и ОГЭ по всем предметам</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up stagger-1">
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

          <div className="flex gap-2">
            {[
              { value: "all", label: "Все" },
              { value: "easy", label: "Лёгкие" },
              { value: "medium", label: "Средние" },
              { value: "hard", label: "Сложные" },
            ].map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDifficulty(d.value)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${selectedDifficulty === d.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/30"
                  }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((task, i) => {
            const subject = subjects.find((s) => s.id === task.subjectId);
            const diff = difficultyConfig[task.difficulty as keyof typeof difficultyConfig];
            const isOpen = openTask === task.id;
            const isFav = favorites.includes(task.id);

            return (
              <div
                key={task.id}
                className={`rounded-2xl border bg-card transition-all duration-300 animate-fade-in-up ${isOpen ? "border-primary/30" : "border-border hover:border-border/80"}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setOpenTask(isOpen ? null : task.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold font-mono-code text-primary">№{task.number}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-sm font-semibold text-foreground">{task.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${diff.bg} ${diff.color}`}>{diff.label}</span>
                          {subject && (
                            <span className="text-xs text-muted-foreground">{subject.emoji} {subject.name}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => toggleFavorite(task.id, e)}
                        className={`p-1.5 rounded-lg transition-all duration-200 ${isFav ? "text-amber-400" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Icon name={isFav ? "Star" : "Star"} size={16} />
                      </button>
                      <Icon
                        name={isOpen ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-border animate-fade-in">
                    <div className="pt-4 space-y-4">
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <p className="text-sm font-medium text-foreground">{task.description}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="CheckCircle" size={15} className="text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">Ответ</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{task.answer}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Lightbulb" size={15} className="text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">Разбор решения</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{task.explanation}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {task.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-muted-foreground">Заданий не найдено. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
}
