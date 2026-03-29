import Icon from "@/components/ui/icon";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const BASE_STATS = [
  { label: "Заданий в базе", valueKey: "base", value: "1 200+", icon: "FileText", color: "text-blue-400" },
  { label: "Решено заданий", valueKey: "solved", value: "0", icon: "CheckCircle", color: "text-emerald-400" },
  { label: "Предметов", valueKey: "subjects", value: "10", icon: "BookOpen", color: "text-amber-400" },
  { label: "Тестов пройдено", valueKey: "tests", value: "0", icon: "ClipboardList", color: "text-violet-400" },
];

const features = [
  {
    icon: "Target",
    title: "Умный анализ ошибок",
    desc: "Система выявляет слабые места и подбирает задания именно по вашим пробелам",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: "BarChart3",
    title: "Детальная статистика",
    desc: "Графики прогресса, процент правильных ответов и динамика по каждому заданию",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: "BookMarked",
    title: "Избранное",
    desc: "Сохраняйте сложные задания и формулы в закладки для быстрого повторения",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: "Zap",
    title: "Тренировочные тесты",
    desc: "Полноценные варианты ЕГЭ и ОГЭ с таймером и автоматической проверкой",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const { getSubjectProgress, totalSolved, totalTests } = useProgress();
  const avgProgress = Math.round(
    subjects.reduce((acc, s) => acc + getSubjectProgress(s.id), 0) / subjects.length
  );

  return (
    <div className="min-h-screen">
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            ЕГЭ и ОГЭ 2025 — актуальная база заданий
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up stagger-1">
            <span className="text-gradient-blue">Готовься</span>{" "}
            <br />
            <span className="text-foreground">умнее и быстрее</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
            Интерактивный справочник с разборами всех заданий, детальной статистикой ошибок и персональным планом подготовки к экзаменам
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <button
              onClick={() => onNavigate("subjects")}
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 glow-blue hover:scale-105"
            >
              Начать подготовку
              <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("tests")}
              className="flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg hover:bg-secondary/80 transition-all duration-200 border border-border hover:border-primary/30"
            >
              <Icon name="ClipboardList" size={20} />
              Пробный тест
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BASE_STATS.map((stat, i) => {
              const displayValue =
                stat.valueKey === "solved" ? String(totalSolved) :
                stat.valueKey === "tests" ? String(totalTests) :
                stat.value;
              return (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`text-3xl sm:text-4xl font-black mb-1 ${stat.color}`}>{displayValue}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ваш прогресс</h2>
            <p className="text-muted-foreground mt-1">Средний результат по всем предметам</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-gradient-blue">{avgProgress}%</div>
            <div className="text-xs text-muted-foreground">изучено</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.slice(0, 8).map((subject, i) => {
            const progress = getSubjectProgress(subject.id);
            return (
              <div
                key={subject.id}
                onClick={() => onNavigate("subjects")}
                className={`p-4 rounded-xl border ${subject.bgClass} card-hover cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{subject.emoji}</span>
                  <span className={`text-xs font-mono-code font-medium ${subject.colorClass}`}>{progress}%</span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-2">{subject.name}</div>
                <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                  <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-foreground mb-3">Всё для сдачи на высокий балл</h2>
            <p className="text-muted-foreground">Инструменты, которые реально помогают</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`p-5 rounded-2xl border ${f.bg} card-hover animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg}`}>
                  <Icon name={f.icon} size={20} className={f.color} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative p-10 rounded-3xl border border-primary/20 bg-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl font-black text-foreground mb-4">Готов к экзамену?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Проверь свои знания прямо сейчас с помощью тренировочного теста
            </p>
            <button
              onClick={() => onNavigate("tests")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 glow-blue hover:scale-105"
            >
              Пройти тест
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}