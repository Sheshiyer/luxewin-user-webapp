const STEPS = [
  {
    title: 'Choose Your Raffle',
    description:
      'Browse our selection of premium raffles featuring exclusive prizes and limited tickets for better odds.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    title: 'Purchase Tickets',
    description:
      'Secure your tickets through our safe and easy payment process. Buy multiple tickets to increase your chances.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
        />
      </svg>
    ),
  },
  {
    title: 'Wait for Draw',
    description:
      'All draws are conducted live and use a verifiable random number generator for complete transparency.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Claim Your Prize',
    description:
      'Winners are notified immediately. Claim your prize and enjoy your exclusive win from LuxeWin.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,102,204,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,102,204,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Decorative Blurs */}
        <div className="absolute -left-32 top-0 w-64 h-64 bg-[var(--primary-color)]/10 rounded-full blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-64 h-64 bg-[var(--secondary-color)]/10 rounded-full blur-3xl" />
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--primary-color)] mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--primary-color)]/10">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] px-2">
            How LuxeWin Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4 sm:px-0">
            Join thousands of winners in our transparent and secure raffle platform. Here&apos;s how
            to get started:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {STEPS.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {/* Step Number */}
              {/* Icon Container */}
              <div className="relative">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20 flex items-center justify-center mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="w-7 sm:w-8 h-7 sm:h-8 text-[var(--primary-color)]">
                    {step.icon}
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[var(--primary-color)] text-white text-xs sm:text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/30 to-[var(--secondary-color)]/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[var(--primary-color)]">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="/auth/sign-up"
              className="w-full sm:w-auto button-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base hover:scale-105 transition-transform duration-300"
            >
              Get Started Now
            </a>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              No credit card required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
