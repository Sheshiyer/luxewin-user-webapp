'use client';

import { useState } from 'react';
import Image from 'next/image';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
  question: QuizQuestion;
}

export function QuizModal({ isOpen, onClose, onSuccess, onFailure, question }: QuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);

    setTimeout(() => {
      if (correct) {
        onSuccess();
      } else {
        onFailure();
      }
    }, 2000); // Show result for 2 seconds before closing
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Complete Challenge to Enter Raffle
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Answer correctly to confirm your entry. You have one attempt.
          </p>
        </div>

        {/* Question */}
        <div className="p-6 space-y-6">
          {question.imageUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={question.imageUrl} alt="Quiz question" fill className="object-cover" />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map(option => (
                <button
                  key={option}
                  onClick={() => !hasSubmitted && setSelectedAnswer(option)}
                  disabled={hasSubmitted}
                  className={`
                    w-full p-4 text-left rounded-lg border-2 transition-all
                    ${
                      hasSubmitted && option === question.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : hasSubmitted && option === selectedAnswer && !isCorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : option === selectedAnswer
                            ? 'border-[#3399FF] bg-[#3399FF]/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#3399FF]/50'
                    }
                  `}
                >
                  <span
                    className={`
                    text-sm font-medium
                    ${
                      hasSubmitted && option === question.correctAnswer
                        ? 'text-green-700 dark:text-green-400'
                        : hasSubmitted && option === selectedAnswer && !isCorrect
                          ? 'text-red-700 dark:text-red-400'
                          : option === selectedAnswer
                            ? 'text-[#3399FF]'
                            : 'text-gray-900 dark:text-white'
                    }
                  `}
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel Entry
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || hasSubmitted}
            className={`
              px-6 py-2 rounded-lg text-sm font-medium transition-all
              ${
                !selectedAnswer || hasSubmitted
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white hover:opacity-90'
              }
            `}
          >
            {hasSubmitted
              ? isCorrect
                ? 'Correct! Confirming entry...'
                : 'Incorrect. Try again next time.'
              : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
}
