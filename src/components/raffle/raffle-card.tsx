'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuiz } from '@/hooks/use-quiz';
import { QuizModal } from './quiz-modal';

interface RaffleCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  ticketPrice: number;
  totalTickets: number;
  ticketsSold: number;
  endDate: string;
  isActive: boolean;
}

export function RaffleCard({
  id,
  title,
  description,
  image,
  ticketPrice,
  totalTickets,
  ticketsSold,
  endDate,
  isActive,
}: RaffleCardProps) {
  const progress = (ticketsSold / totalTickets) * 100;
  const endDateTime = new Date(endDate);
  const isEnding = endDateTime.getTime() - Date.now() < 24 * 60 * 60 * 1000; // 24 hours

  const {
    isQuizOpen,
    currentQuestion,
    startQuiz,
    handleQuizSuccess,
    handleQuizFailure,
    closeQuiz,
  } = useQuiz({
    raffleId: id,
    onQuizComplete: success => {
      if (success) {
        // TODO: Handle successful raffle entry
        console.log('Successfully entered raffle!');
      } else {
        // TODO: Handle failed attempt
        console.log('Failed quiz attempt');
      }
    },
  });

  const handleEnterRaffle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    startQuiz();
  };

  return (
    <>
      <Link href={`/raffles/${id}`}>
        <div className="group relative h-full card overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
          {/* Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
              priority
              quality={85}
            />
            {!isActive && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Ended</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Title & Status */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{title}</h3>
              {isActive && isEnding && (
                <span className="shrink-0 px-2 py-1 text-[10px] sm:text-xs font-medium text-[var(--warning)] bg-[var(--warning)]/10 rounded-full">
                  Ending Soon
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
              {description}
            </p>

            {/* Progress */}
            <div className="space-y-2 mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tickets Sold</span>
                <span className="font-medium tabular-nums">
                  {ticketsSold} / {totalTickets}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary-color)] transition-all duration-300"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Price per ticket
                </span>
                <p className="text-base sm:text-lg font-bold tabular-nums">
                  ${ticketPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleEnterRaffle}
                className="button-primary text-xs sm:text-sm px-4 sm:px-6 py-2 hover:scale-105 transition-transform duration-300"
              >
                {isActive ? 'Enter Now' : 'View Details'}
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Quiz Modal */}
      {currentQuestion && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={closeQuiz}
          onSuccess={handleQuizSuccess}
          onFailure={handleQuizFailure}
          question={currentQuestion}
        />
      )}
    </>
  );
}
