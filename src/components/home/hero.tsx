import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,102,204,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(0,102,204,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/10 via-transparent to-[var(--secondary-color)]/10" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--primary-color)] mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--primary-color)]/10">
            Premium Raffle Platform
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] leading-tight">
            Win Exclusive Prizes in Premium Raffles
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2">
            Join the most trusted raffle platform with guaranteed authenticity and transparency.
            Experience the thrill of winning premium prizes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/raffles"
              className="w-full sm:w-auto button-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              Browse Raffles
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto button-outline px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mt-10 sm:mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">10K+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">500+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Raffles Completed
              </div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">$1M+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Prizes Awarded
              </div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">100%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Verified Winners
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-32 sm:w-64 h-32 sm:h-64 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary-color/10 blur-2xl sm:blur-3xl" />
      <div className="absolute top-1/2 right-0 w-32 sm:w-64 h-32 sm:h-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary-color/10 blur-2xl sm:blur-3xl" />
    </div>
  );
}
