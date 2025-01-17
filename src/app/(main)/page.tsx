import { Hero } from '@/components/home/hero';
import { FeaturedRaffles } from '@/components/home/featured-raffles';
import { HowItWorks } from '@/components/home/how-it-works';
import { Winners } from '@/components/home/winners';

export default function Home() {
  return (
    <div className="pt-16">
      {' '}
      {/* Add padding-top to account for fixed header */}
      <Hero />
      <FeaturedRaffles />
      <HowItWorks />
      <Winners />
    </div>
  );
}
