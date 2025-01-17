'use client';

interface QuizStepProps {
  raffleId: string;
  onComplete: () => void;
  ticketCount: number;
  totalAmount: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizStep({
  raffleId,
  onComplete,
  ticketCount,
  totalAmount,
}: QuizStepProps) {
  const getQuizQuestion = (): QuizQuestion => {
    switch (raffleId) {
      case '1': // Rolex Daytona
        return {
          question: 'What is the case diameter of the Rolex Daytona?',
          options: ['36mm', '38mm', '40mm', '42mm'],
          correctAnswer: '40mm',
        };
      case '2': // Luxury Villa
        return {
          question: 'What is the land size of the Luxury Villa in Bali?',
          options: ['1000 sqm', '1500 sqm', '2000 sqm', '2500 sqm'],
          correctAnswer: '2000 sqm',
        };
      case '3': // Ferrari F8
        return {
          question: 'What is the 0-60 mph time of the Ferrari F8 Tributo?',
          options: ['2.7 seconds', '2.9 seconds', '3.1 seconds', '3.3 seconds'],
          correctAnswer: '2.9 seconds',
        };
      default:
        return {
          question: 'Please select the correct answer',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
        };
    }
  };

  const quiz = getQuizQuestion();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-[#1A1A1A] rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-white">Quiz Challenge</h2>
          <p className="text-gray-400">
            Answer this question correctly to proceed with your purchase of {ticketCount} tickets
            for ${totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">{quiz.question}</h3>
            <div className="space-y-3">
              {quiz.options.map(option => (
                <button
                  key={option}
                  onClick={onComplete}
                  className="w-full text-left p-4 rounded-lg bg-[#1A1A1A] text-white hover:bg-[#3399FF] transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>This question is based on the product specifications.</p>
            <p>You can find the answer in the product details above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
