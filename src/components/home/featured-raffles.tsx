import Image from 'next/image';

// Mock data matching the landing page
const MOCK_RAFFLES = [
  {
    id: '1',
    title: 'Rolex Daytona',
    description: 'Limited Edition Platinum Daytona with custom diamond setting',
    image: '/images/rolex-daytona.png',
    ticketPrice: 250,
    totalTickets: 1000,
    ticketsSold: 456,
    endDate: '2024-02-15',
    isActive: true,
    value: '$45,000',
    category: 'luxury',
  },
  {
    id: '2',
    title: 'Luxury Villa in Bali',
    description: '5-bedroom beachfront villa with private pool and staff',
    image: '/images/luxury-villa.png',
    ticketPrice: 500,
    totalTickets: 2000,
    ticketsSold: 892,
    endDate: '2024-02-20',
    isActive: true,
    value: '$2.5M',
    category: 'travel',
  },
  {
    id: '3',
    title: 'Ferrari F8 Tributo',
    description: '2023 Model with custom interior and track package',
    image: '/images/ferrari-f8.png',
    ticketPrice: 1000,
    totalTickets: 5000,
    ticketsSold: 2341,
    endDate: '2024-03-01',
    isActive: true,
    value: '$350,000',
    category: 'luxury',
  },
];

export function FeaturedRaffles() {
  return (
    <section id="featured-raffles" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-3 sm:px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(51,153,255,0.02)_1px,transparent_1px),linear-gradient(0deg,rgba(51,153,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Decorative Blurs */}
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#3399FF]/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-[#00FFCC]/5 rounded-full blur-3xl" />

        {/* Section Header */}
        <div className="relative max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#3399FF] mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#3399FF]/10">
            Featured Opportunities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3399FF] to-[#00FFCC] px-2">
            Enter now for a chance to win these exclusive prizes
          </h2>
          <p className="text-base sm:text-lg text-gray-400 px-4 sm:px-0">
            Join our premium raffles with the best odds and exclusive prizes.
          </p>
        </div>

        {/* Raffles Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {MOCK_RAFFLES.map(raffle => (
            <div key={raffle.id} className="card-interactive group">
              <div className="aspect-w-16 aspect-h-9 relative h-40 sm:h-48">
                <Image src={raffle.image} alt={raffle.title} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-black/50 text-[#3399FF] backdrop-blur-sm">
                    Value: {raffle.value}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-[#3399FF] transition-colors">
                  {raffle.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                  {raffle.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Tickets Available</span>
                      <span className="text-white font-medium">
                        {raffle.ticketsSold}/{raffle.totalTickets}
                      </span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                      <div
                        className="bg-[#3399FF] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(raffle.ticketsSold / raffle.totalTickets) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price per ticket</p>
                      <p className="text-lg font-semibold text-[#3399FF]">${raffle.ticketPrice}</p>
                    </div>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white text-sm rounded-lg hover:opacity-90 transition-opacity">
                      Enter Raffle
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Ends {new Date(raffle.endDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${
                        raffle.ticketsSold / raffle.totalTickets > 0.8
                          ? 'bg-red-900/30 text-red-400'
                          : 'bg-green-900/30 text-green-400'
                      }
                    `}
                    >
                      {raffle.ticketsSold / raffle.totalTickets > 0.8
                        ? 'Almost Sold Out'
                        : 'Tickets Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="relative text-center mt-8 sm:mt-12 md:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white text-sm sm:text-base rounded-lg hover:opacity-90 transition-opacity">
              View All Raffles
            </button>
            <span className="text-sm text-gray-400">{MOCK_RAFFLES.length}+ active raffles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
