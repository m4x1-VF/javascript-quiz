export interface Question {
  id: number;
  question: string;
  code: string;
  answer: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
