import Icon from "@/components/ui/icon";
import { subjects } from "@/data/subjects";

const weeklyData = [
  { day: "Пн", tasks: 8, correct: 6 },
  { day: "Вт", tasks: 12, correct: 10 },
  { day: "Ср", tasks: 5, correct: 4 },
  { day: "Чт", tasks: 15, correct: 11 },
  { day: "Пт", tasks: 10, correct: 9 },
  { day: "Сб", tasks: 18, correct: 14 },
  { day: "Вс", tasks: 6, correct: 5 },
];

const weakTopics = [
  { subject: "Физика", topic: "Квантовая физика", error: 72, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { subject: "Химия", topic: "Органические реакции", error: 68, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { subject: "Математика", topic: "Интегралы", error: 55, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { subject: "История", topic: "Внешняя политика СССР", error: 48, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
];

const achievements = [
  { icon: "🔥", title: "Серия 7 дней", desc: "Заниматься 7 дней подряд", earned: true },
  { icon: "⚡", title: "Скорострел", desc: "10 заданий за один день", earned: true },
  { icon: "🎯", title: "Снайпер", desc: "5 правильных ответов подряд", earned: true },
  { icon: "📚", title: "Книгочей", desc: "Изучить весь справочник", earned: false },
  { icon: "🏆", title: "Отличник", desc: "Набрать 90% в тесте", earned: false },
  { icon: "🌟", title: "Мастер", desc: "Пройти все задания по предмету", earned: false },
];

const maxTasks = Math.max(...weeklyData.map((d) => d.tasks));

export default function ProgressPage() {
  const totalTasks = weeklyData.reduce((acc, d) => acc + d.tasks, 0);
  const totalCorrect = weeklyData.reduce((acc, d) => acc + d.correct, 0);
  const avgAccuracy = Math.round((totalCorrect / totalTasks) * 100);
  const avgSubjectProgress = Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-foreground mb-2">Прогресс</h1>
          <p className="text-muted-foreground">Детальная аналитика вашей подготовки</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Задач решено", value: totalTasks, icon: "FileText", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", sub: "за неделю" },
            { label: "Точность", value: `${avgAccuracy}%`, icon: "Target", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", sub: "правильных ответов" },
            { label: "Средний прогресс", value: `${avgSubjectProgress}%`, icon: "TrendingUp", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", sub: "по предметам" },
            { label: "Дней подряд", value: "7", icon: "Flame", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", sub: "текущая серия" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-5 rounded-2xl border ${stat.bg} animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon name={stat.icon} size={18} className={stat.color} />
              </div>
              <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in-up stagger-2">
            <h2 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <Icon name="BarChart2" size={18} className="text-primary" />
              Активность за неделю
            </h2>
            <div className="flex items-end gap-2 h-32">
              {weeklyData.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "100px" }}>
                    <div className="w-full flex-1 flex flex-col justify-end gap-0.5">
                      <div
                        className="w-full bg-primary/20 rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${(d.tasks / maxTasks) * 80}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                      <div
                        className="w-full bg-primary rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${(d.correct / maxTasks) * 80}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-primary/20" />
                <span className="text-xs text-muted-foreground">Всего заданий</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs text-muted-foreground">Правильных</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in-up stagger-3">
            <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} className="text-amber-400" />
              Слабые темы
            </h2>
            <div className="space-y-4">
              {weakTopics.map((topic, i) => (
                <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <span className={`text-xs font-medium ${topic.color}`}>{topic.subject}</span>
                      <span className="text-sm text-foreground ml-2">{topic.topic}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono-code">{topic.error}% ошибок</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-400/70 rounded-full transition-all duration-700"
                      style={{ width: `${topic.error}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 mb-8 animate-fade-in-up">
          <h2 className="font-bold text-foreground mb-6 flex items-center gap-2">
            <Icon name="BookOpen" size={18} className="text-primary" />
            Прогресс по предметам
          </h2>
          <div className="space-y-4">
            {subjects.map((subject, i) => (
              <div key={subject.id} className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="text-xl w-8 flex-shrink-0">{subject.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{subject.name}</span>
                    <span className={`text-xs font-mono-code font-medium ${subject.colorClass}`}>{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="progress-bar h-full" style={{ width: `${subject.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in-up">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
            <Icon name="Award" size={18} className="text-amber-400" />
            Достижения
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {achievements.map((ach, i) => (
              <div
                key={ach.title}
                className={`p-3 rounded-xl border text-center transition-all duration-200 animate-fade-in-up
                  ${ach.earned
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-secondary border-border opacity-40"
                  }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`text-2xl mb-1 ${!ach.earned && "grayscale"}`}>{ach.icon}</div>
                <div className="text-xs font-semibold text-foreground mb-0.5">{ach.title}</div>
                <div className="text-xs text-muted-foreground leading-tight">{ach.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
