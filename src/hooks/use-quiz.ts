'use client';

import { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface UseQuizProps {
  raffleId: string;
  onQuizComplete: (success: boolean) => void;
}

export function useQuiz({ onQuizComplete }: UseQuizProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);

  const startQuiz = () => {
    // TODO: Replace with actual quiz data from API
    const demoQuestion: QuizQuestion = {
      id: '1',
      question: 'What is the minimum age requirement to participate in this raffle?',
      options: ['16 years', '18 years', '21 years', '25 years'],
      correctAnswer: '18 years',
    };
    setCurrentQuestion(demoQuestion);
    setIsQuizOpen(true);
  };

  const handleQuizSuccess = () => {
    setIsQuizOpen(false);
    onQuizComplete(true);
  };

  const handleQuizFailure = () => {
    setIsQuizOpen(false);
    onQuizComplete(false);
  };

  const closeQuiz = () => {
    setIsQuizOpen(false);
    setCurrentQuestion(null);
  };

  return {
    isQuizOpen,
    currentQuestion,
    startQuiz,
    handleQuizSuccess,
    handleQuizFailure,
    closeQuiz,
  };
}
