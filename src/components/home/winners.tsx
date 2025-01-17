export function Winners() {
  return (
    <section id="winners" className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-semibold text-[var(--primary-color)] mb-4 px-4 py-1.5 rounded-full bg-[var(--primary-color)]/10">
            Recent Winners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
            Our Lucky Winners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Meet some of our recent winners and their amazing prizes.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Winner Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                <span className="text-[var(--primary-color)] font-semibold">JD</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John D.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Won 2 days ago</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-medium">Luxury Watch Collection</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &ldquo;I never thought I&apos;d win such an amazing prize! The process was smooth
                and transparent.&rdquo;
              </p>
            </div>
          </div>

          {/* Winner Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                <span className="text-[var(--primary-color)] font-semibold">SM</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah M.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Won 5 days ago</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-medium">Gaming Setup Bundle</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &ldquo;Best platform ever! The gaming setup I won is absolutely incredible.&rdquo;
              </p>
            </div>
          </div>

          {/* Winner Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                <span className="text-[var(--primary-color)] font-semibold">RK</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Robert K.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Won 1 week ago</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-medium">Dream Vacation Package</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &ldquo;Can&apos;t wait for my Maldives trip! LuxeWin made my dream come true.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
