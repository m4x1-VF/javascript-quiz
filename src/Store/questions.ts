import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

export const useQuestionsStore = create<State>((set, get) => {
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
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      // usar el structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions);
      // encontramos el indice de la pregunta
      const questionIndex = newQuestions.findIndex(
        (question) => question.id === questionId
      );
      // obtenemos la información de la pregunta
      const questionInfo = newQuestions[questionIndex];
      // averiguamos si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      // si la respuesta es correcta, lanzamos la animación de confetti
      if (isCorrectUserAnswer) confetti();
      // cambiamos esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };
      // actualizamos el estado
      set({ questions: newQuestions });
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion });
      }
    },
  };
});
