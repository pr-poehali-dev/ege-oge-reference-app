import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import SubjectsPage from "@/pages/SubjectsPage";
import TasksPage from "@/pages/TasksPage";
import SolutionsPage from "@/pages/SolutionsPage";
import ReferencePage from "@/pages/ReferencePage";
import TestsPage from "@/pages/TestsPage";
import ProgressPage from "@/pages/ProgressPage";
import FavoritesPage from "@/pages/FavoritesPage";

type Section = "home" | "subjects" | "tasks" | "solutions" | "reference" | "tests" | "progress" | "favorites";

function AppContent() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  const navigate = (section: string) => {
    setActiveSection(section as Section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activeSection) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "subjects": return <SubjectsPage onNavigate={navigate} />;
      case "tasks": return <TasksPage />;
      case "solutions": return <SolutionsPage />;
      case "reference": return <ReferencePage />;
      case "tests": return <TestsPage />;
      case "progress": return <ProgressPage />;
      case "favorites": return <FavoritesPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={navigate} />
      <main key={activeSection} className="animate-fade-in">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <AppContent />
    </TooltipProvider>
  );
}
