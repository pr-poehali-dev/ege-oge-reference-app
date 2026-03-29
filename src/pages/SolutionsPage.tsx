import { useState } from "react";
import Icon from "@/components/ui/icon";

const solutions = [
  {
    id: 1,
    subject: "Математика",
    emoji: "📐",
    taskNumber: 2,
    title: "Задача на движение",
    difficulty: "medium",
    views: 1240,
    steps: [
      { title: "Читаем условие", content: "Два велосипедиста едут навстречу друг другу. Первый — 20 км/ч, второй — 30 км/ч. Расстояние между ними 100 км. Через сколько времени они встретятся?" },
      { title: "Определяем скорость сближения", content: "v = v₁ + v₂ = 20 + 30 = 50 км/ч\nТак как велосипедисты движутся навстречу, скорости складываются." },
      { title: "Вычисляем время", content: "t = S / v = 100 / 50 = 2 часа\nПо формуле: время = расстояние ÷ скорость" },
      { title: "Ответ", content: "Велосипедисты встретятся через 2 часа." },
    ],
    tags: ["движение", "скорость", "задание 2"],
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 2,
    subject: "Русский язык",
    emoji: "📖",
    taskNumber: 12,
    title: "Написание -Н- и -НН- в причастиях",
    difficulty: "hard",
    views: 3860,
    steps: [
      { title: "Правило для причастий", content: "НН пишется, если: есть приставка (кроме НЕ), есть зависимое слово, суффикс -ОВА-/-ЕВА-, образовано от глагола совершенного вида." },
      { title: "Примеры с НН", content: "ПО-краш-ЕНН-ый (есть приставка)\nкрашЕНН-ый тщательно (есть зависимое слово)\nмаринОВАНН-ый (суффикс -ОВА-)" },
      { title: "Примеры с Н", content: "крашЕН-ый пол — краткое, нет приставки и зависимого слова\nжарЕН-ый — образовано от глагола несов. вида без приставки" },
      { title: "Алгоритм решения", content: "1. Определи часть речи\n2. Найди приставку (кроме НЕ)\n3. Найди зависимое слово\n4. Определи вид глагола" },
    ],
    tags: ["орфография", "-НН-", "причастия", "задание 12"],
    colorClass: "text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: 3,
    subject: "Физика",
    emoji: "⚛️",
    taskNumber: 8,
    title: "Равноускоренное движение",
    difficulty: "medium",
    views: 980,
    steps: [
      { title: "Основные формулы", content: "v = v₀ + at\nS = v₀t + at²/2\nv² = v₀² + 2aS" },
      { title: "Разбор задачи", content: "Автомобиль разгоняется с 0 до 72 км/ч за 10 с. Найдите ускорение и путь.\nv₀ = 0, v = 72 км/ч = 20 м/с, t = 10 с" },
      { title: "Вычисляем ускорение", content: "a = (v − v₀) / t = (20 − 0) / 10 = 2 м/с²" },
      { title: "Вычисляем путь", content: "S = v₀t + at²/2 = 0 + 2 × 100/2 = 100 м" },
    ],
    tags: ["кинематика", "ускорение", "задание 8"],
    colorClass: "text-violet-400",
    bgClass: "bg-violet-500/10 border-violet-500/20",
  },
];

const diffMap = {
  easy: { label: "Лёгкое", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  medium: { label: "Среднее", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  hard: { label: "Сложное", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
};

export default function SolutionsPage() {
  const [selected, setSelected] = useState<number | null>(1);

  const active = solutions.find((s) => s.id === selected);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Разборы</h1>
          <p className="text-muted-foreground">Пошаговые объяснения решений со всеми выкладками</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-80 flex-shrink-0 space-y-3">
            {solutions.map((s, i) => {
              const diff = diffMap[s.difficulty as keyof typeof diffMap];
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 animate-fade-in-up card-hover
                    ${selected === s.id
                      ? `${s.bgClass} border-opacity-60`
                      : "bg-card border-border hover:border-border/80"
                    }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{s.subject}</span>
                        <span className="text-xs font-mono-code text-muted-foreground">№{s.taskNumber}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${diff.bg} ${diff.color}`}>{diff.label}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Eye" size={11} /> {s.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {active && (
            <div className="flex-1 animate-scale-in">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className={`p-6 border-b border-border ${active.bgClass}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{active.emoji}</span>
                        <div>
                          <span className="text-sm text-muted-foreground">{active.subject} · Задание №{active.taskNumber}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-black text-foreground">{active.title}</h2>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Icon name="Eye" size={13} />
                      <span>{active.views} просмотров</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {active.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${active.bgClass} ${active.colorClass}`}>
                          {i + 1}
                        </div>
                        {i < active.steps.length - 1 && (
                          <div className="w-px h-full bg-border mx-auto mt-2 ml-[15px]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                          <pre className="text-sm text-muted-foreground font-mono-code whitespace-pre-wrap leading-relaxed">
                            {step.content}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground border border-border">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
