import { useState, useCallback } from "react";
import { tasks as baseTasks } from "@/data/subjects";

const allTaskIds = [
  ...baseTasks.map((t) => ({ id: t.id, subjectId: t.subjectId })),
  { id: 4, subjectId: "physics" },
  { id: 5, subjectId: "chemistry" },
  { id: 6, subjectId: "biology" },
  { id: 7, subjectId: "geography" },
  { id: 8, subjectId: "geography" },
  { id: 9, subjectId: "geography" },
  { id: 10, subjectId: "social" },
  { id: 11, subjectId: "social" },
  { id: 12, subjectId: "social" },
];

const STORAGE_KEY = "ege_progress";

interface ProgressData {
  solvedTasks: number[];
  testResults: { subjectId: string; score: number; total: number; date: string }[];
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load progress", e);
  }
  return { solvedTasks: [], testResults: [] };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(loadProgress);

  const markTaskSolved = useCallback((taskId: number) => {
    setData((prev) => {
      if (prev.solvedTasks.includes(taskId)) return prev;
      const next = { ...prev, solvedTasks: [...prev.solvedTasks, taskId] };
      saveProgress(next);
      return next;
    });
  }, []);

  const saveTestResult = useCallback((subjectId: string, score: number, total: number) => {
    setData((prev) => {
      const result = { subjectId, score, total, date: new Date().toISOString() };
      const next = { ...prev, testResults: [...prev.testResults, result] };
      saveProgress(next);
      return next;
    });
  }, []);

  const getSubjectProgress = useCallback(
    (subjectId: string): number => {
      const subjectTaskIds = allTaskIds.filter((t) => t.subjectId === subjectId).map((t) => t.id);
      if (subjectTaskIds.length === 0) return 0;
      const solved = subjectTaskIds.filter((id) => data.solvedTasks.includes(id)).length;
      return Math.round((solved / subjectTaskIds.length) * 100);
    },
    [data.solvedTasks]
  );

  const isTaskSolved = useCallback(
    (taskId: number) => data.solvedTasks.includes(taskId),
    [data.solvedTasks]
  );

  const totalSolved = data.solvedTasks.length;
  const totalTests = data.testResults.length;
  const avgScore =
    data.testResults.length > 0
      ? Math.round(
          data.testResults.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) /
            data.testResults.length
        )
      : 0;

  return {
    markTaskSolved,
    saveTestResult,
    getSubjectProgress,
    isTaskSolved,
    solvedTasks: data.solvedTasks,
    testResults: data.testResults,
    totalSolved,
    totalTests,
    avgScore,
  };
}