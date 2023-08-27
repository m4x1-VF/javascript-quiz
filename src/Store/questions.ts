import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
}

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const masterKey = `$2b$10$kVMgxE${import.meta.env.VITE_X_MASTER_KEY}`;
      const accessKey = `$2b$10$B43Zs2jX4fA6nWrRjP${
        import.meta.env.VITE_X_ACCESS_KEY
      }`;
      const res = await fetch(
        "https://api.jsonbin.io/v3/b/64eba59db89b1e2299d6bc14",
        {
          headers: {
            "X-Master-Key": masterKey,
            "X-Access-Key": accessKey,
          },
        }
      );
      const json = await res.json();
      const questions = json.record
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
      set({ questions });
    },
  };
});
