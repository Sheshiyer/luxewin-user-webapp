import { RaffleCard } from '@/components/raffle/raffle-card'

// Temporary mock data - will be replaced with real data from API
const MOCK_RAFFLES = [
  {
    id: '1',
    title: 'Luxury Watch Collection',
    description: 'Win a curated collection of premium timepieces including Rolex, Omega, and Patek Philippe.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200',
    ticketPrice: 99.99,
    totalTickets: 1000,
    ticketsSold: 750,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    isActive: true,
  },
  {
    id: '2',
    title: 'Ultimate Gaming Setup',
    description: 'Complete gaming station with the latest RTX 4090, gaming chair, and premium peripherals.',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1200',
    ticketPrice: 49.99,
    totalTickets: 2000,
    ticketsSold: 1800,
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    isActive: true,
  },
  {
    id: '3',
    title: 'Dream Vacation Package',
    description: 'All-inclusive luxury vacation for two to Maldives with premium resort stay.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200',
    ticketPrice: 149.99,
    totalTickets: 500,
    ticketsSold: 480,
    endDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    isActive: true,
  },
]

export function FeaturedRaffles() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="container mx-auto px-4 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,102,204,0.02)_1px,transparent_1px),linear-gradient(0deg,rgba(0,102,204,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Decorative Blurs */}
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-[var(--primary-color)]/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-[var(--secondary-color)]/5 rounded-full blur-3xl" />
        {/* Section Header */}
        <div className="relative max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
            Featured Raffles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our handpicked selection of premium raffles with the best odds and exclusive prizes.
          </p>
        </div>

        {/* Raffles Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {MOCK_RAFFLES.map(raffle => (
            <RaffleCard
              key={raffle.id}
              {...raffle}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="relative text-center mt-16">
          <div className="inline-flex items-center">
            <a
              href="/raffles"
              className="button-outline px-8 py-3 hover:scale-105 transition-transform duration-300 backdrop-blur-sm"
            >
              View All Raffles
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
