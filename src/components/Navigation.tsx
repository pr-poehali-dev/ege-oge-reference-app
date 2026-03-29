import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "subjects", label: "Предметы", icon: "BookOpen" },
  { id: "tasks", label: "Задания", icon: "ListChecks" },
  { id: "solutions", label: "Разборы", icon: "Lightbulb" },
  { id: "reference", label: "Справочник", icon: "Library" },
  { id: "tests", label: "Тесты", icon: "ClipboardList" },
  { id: "progress", label: "Прогресс", icon: "BarChart3" },
  { id: "favorites", label: "Избранное", icon: "Star" },
];

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("home")}>
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center glow-blue">
                <span className="text-sm font-bold text-gradient-blue">Э</span>
              </div>
              <div>
                <span className="font-bold text-foreground">ЕГЭ</span>
                <span className="text-muted-foreground">/ОГЭ</span>
                <span className="ml-2 text-xs font-mono-code text-primary/70 hidden sm:inline">справочник</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-item flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
