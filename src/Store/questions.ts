import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number) => {
            const jsonData = await getAllQuestions();
            const questions = jsonData
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions }, false, "fetch_question");
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
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;
            // si la respuesta es correcta, lanzamos la animación de confetti
            if (isCorrectUserAnswer) confetti();
            // cambiamos esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            // actualizamos el estado
            set({ questions: newQuestions }, false, "select_answer");
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, "next_questions");
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;
            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                "previous_questions"
              );
            }
          },
          reset: () => {
            set(
              {
                questions: [],
                currentQuestion: 0,
              },
              false,
              "reset_questions"
            );
          },
        };
      },

      { name: "questions" }
    )
  )
);
