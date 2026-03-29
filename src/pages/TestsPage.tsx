import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useProgress } from "@/hooks/useProgress";

const testQuestions = [
  {
    id: 1,
    subject: "Математика",
    text: "Найдите значение выражения: 3² + 4² = ?",
    options: ["25", "7", "49", "12"],
    correct: 0,
    explanation: "3² = 9, 4² = 16, сумма = 25. Это теорема Пифагора: 3² + 4² = 5²",
  },
  {
    id: 2,
    subject: "Русский язык",
    text: "В каком слове пишется НН?",
    options: ["крашеный пол", "жареная рыба", "купленный билет", "тушеное мясо"],
    correct: 2,
    explanation: "«Купленный» — причастие от глагола совершенного вида «купить», поэтому пишется НН.",
  },
  {
    id: 3,
    subject: "Физика",
    text: "Единица измерения силы в системе СИ:",
    options: ["Джоуль", "Ватт", "Ньютон", "Паскаль"],
    correct: 2,
    explanation: "Сила измеряется в Ньютонах (Н). 1 Н = 1 кг·м/с²",
  },
  {
    id: 4,
    subject: "Биология",
    text: "Сколько хромосом в норме у человека?",
    options: ["23", "46", "48", "44"],
    correct: 1,
    explanation: "У человека 46 хромосом (23 пары). Половые клетки содержат 23 хромосомы.",
  },
  {
    id: 5,
    subject: "История",
    text: "В каком году состоялось Куликовская битва?",
    options: ["1147", "1237", "1380", "1480"],
    correct: 2,
    explanation: "Куликовская битва произошла 8 сентября 1380 года. Войска Дмитрия Донского победили орду Мамая.",
  },
];

type Phase = "start" | "quiz" | "results";

export default function TestsPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const { saveTestResult } = useProgress();
  const savedRef = useRef(false);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setTimerActive(false); finishTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTest = () => {
    setPhase("quiz");
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
    setTimeLeft(300);
    setTimerActive(true);
    savedRef.current = false;
  };

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentQ + 1 >= testQuestions.length) {
      setTimerActive(false);
      setAnswers(newAnswers);
      setPhase("results");
      if (!savedRef.current) {
        savedRef.current = true;
        const correct = newAnswers.filter((a, i) => a === testQuestions[i]?.correct).length;
        saveTestResult("mixed", correct, testQuestions.length);
      }
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const finishTest = () => {
    setTimerActive(false);
    setPhase("results");
    if (!savedRef.current) {
      savedRef.current = true;
      const correct = answers.filter((a, i) => a === testQuestions[i]?.correct).length;
      saveTestResult("mixed", correct, testQuestions.length);
    }
  };

  const correctCount = answers.filter((a, i) => a === testQuestions[i]?.correct).length;
  const score = Math.round((correctCount / testQuestions.length) * 100);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (phase === "start") {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-4xl font-black text-foreground mb-4">Тренировочный тест</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Проверьте свои знания по основным предметам ЕГЭ. 5 вопросов, 5 минут. После каждого ответа — подробное объяснение.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: "FileText", label: "5 вопросов", sub: "из разных предметов" },
                { icon: "Clock", label: "5 минут", sub: "на весь тест" },
                { icon: "Lightbulb", label: "Разборы", sub: "после каждого ответа" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-card border border-border">
                  <Icon name={item.icon} size={20} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            <button
              onClick={startTest}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-200 glow-blue hover:scale-105"
            >
              Начать тест
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = testQuestions[currentQ];
    const progress = ((currentQ) / testQuestions.length) * 100;

    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-mono-code">
                {currentQ + 1} / {testQuestions.length}
              </span>
              <span className="text-xs px-2 py-1 rounded-md bg-secondary border border-border text-muted-foreground">
                {q.subject}
              </span>
            </div>
            <div className={`flex items-center gap-1.5 font-mono-code text-sm font-medium ${timeLeft < 60 ? "text-rose-400" : "text-foreground"}`}>
              <Icon name="Clock" size={14} />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="h-1.5 bg-secondary rounded-full mb-8 overflow-hidden animate-fade-in-up stagger-1">
            <div className="progress-bar h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-scale-in">
            <p className="text-lg font-semibold text-foreground leading-relaxed">{q.text}</p>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((option, i) => {
              let style = "bg-card border-border text-foreground hover:border-primary/40";
              if (selected !== null) {
                if (i === q.correct) style = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300";
                else if (i === selected && selected !== q.correct) style = "bg-rose-500/10 border-rose-500/40 text-rose-300";
                else style = "bg-card border-border text-muted-foreground opacity-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 animate-fade-in-up ${style}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <span className="w-7 h-7 rounded-lg bg-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono-code">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm font-medium">{option}</span>
                  {selected !== null && i === q.correct && (
                    <Icon name="CheckCircle" size={16} className="ml-auto text-emerald-400" />
                  )}
                  {selected !== null && i === selected && selected !== q.correct && (
                    <Icon name="XCircle" size={16} className="ml-auto text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-6 animate-scale-in">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Lightbulb" size={15} className="text-blue-400" />
                <span className="text-xs font-medium text-blue-400">Пояснение</span>
              </div>
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
            </div>
          )}

          {selected !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 animate-fade-in"
            >
              {currentQ + 1 >= testQuestions.length ? "Завершить тест" : "Следующий вопрос →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="text-6xl mb-4">{score >= 80 ? "🏆" : score >= 60 ? "👍" : "📚"}</div>
          <h1 className="text-4xl font-black text-foreground mb-2">Результаты</h1>
          <div className={`text-6xl font-black mt-4 ${score >= 80 ? "text-gradient-blue" : score >= 60 ? "text-gradient-amber" : "text-rose-400"}`}>
            {score}%
          </div>
          <p className="text-muted-foreground mt-2">
            Правильно: {correctCount} из {testQuestions.length}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {testQuestions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border animate-fade-in-up ${isCorrect ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name={isCorrect ? "CheckCircle" : "XCircle"}
                    size={18}
                    className={isCorrect ? "text-emerald-400 mt-0.5 flex-shrink-0" : "text-rose-400 mt-0.5 flex-shrink-0"}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">{q.text}</p>
                    {!isCorrect && (
                      <p className="text-xs text-muted-foreground">
                        Правильный ответ: <span className="text-emerald-400 font-medium">{q.options[q.correct]}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={startTest}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 glow-blue hover:scale-105 animate-fade-in-up"
        >
          Пройти ещё раз
        </button>
      </div>
    </div>
  );
}