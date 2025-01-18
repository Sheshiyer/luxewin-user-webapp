'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import MultiplierSelector from '@/components/raffle/multiplier-selector';
import QuizStep from '@/components/raffle/quiz-step';
import PaymentStep from '@/components/raffle/payment-step';
import ImageGallery from '@/components/raffle/image-gallery';
import InfoTabs from '@/components/raffle/info-tabs';
import StatsDisplay from '@/components/raffle/stats-display';
import { MOCK_RAFFLES } from '@/data/mock-raffles';
import { RaffleDetails } from '@/types/raffle';

type Step = 'overview' | 'multiplier' | 'quiz' | 'payment';

export default function RafflePage() {
  const [raffle, setRaffle] = useState<RaffleDetails | null>(null);
  const [baseTicketCount, setBaseTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<Step>('overview');
  const [multiplier, setMultiplier] = useState(1);
  const [bonusPercentage, setBonusPercentage] = useState(0);
  const [finalTicketCount, setFinalTicketCount] = useState(1);
  const params = useParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchRaffleDetails() {
      if (!params.id) return;

      // First try to get from Supabase
      const { data, error } = await supabase
        .from('raffles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (!error && data) {
        setRaffle(data);
      } else {
        // If Supabase fails, use mock data
        const mockRaffle = MOCK_RAFFLES.find(r => r.id === params.id);
        if (mockRaffle) {
          setRaffle(mockRaffle);
        }
      }
      setLoading(false);
    }

    fetchRaffleDetails();
  }, [params.id, supabase]);

  const handleTicketChange = (increment: boolean) => {
    setBaseTicketCount(prev => {
      const newCount = increment ? prev + 1 : prev - 1;
      const finalCount = Math.max(1, Math.min(newCount, 100)); // Min 1, Max 100 tickets
      setFinalTicketCount(finalCount * multiplier);
      return finalCount;
    });
  };

  const calculateOdds = () => {
    if (!raffle) return 0;
    const totalTickets = raffle.totalTickets;
    return (finalTicketCount / totalTickets) * 100;
  };

  const handleParticipate = () => {
    setCurrentStep('multiplier');
  };

  const handleMultiplierSelect = (mult: number, bonus: number) => {
    setMultiplier(mult);
    setBonusPercentage(bonus);
    setFinalTicketCount(baseTicketCount * mult);
  };

  const handleMultiplierNext = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = () => {
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    // TODO: Implement payment completion handling
    // - Process payment transaction
    // - Create ticket records
    // - Update user's ticket count
    // - Show success confirmation
  };

  const calculateTotalAmount = () => {
    if (!raffle) return 0;
    return finalTicketCount * raffle.ticketPrice;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3399FF]"></div>
      </div>
    );
  }

  if (!raffle) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        Raffle not found
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'multiplier':
        return (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <MultiplierSelector
              baseTickets={baseTicketCount}
              baseOdds={calculateOdds()}
              onSelect={handleMultiplierSelect}
              onNext={handleMultiplierNext}
            />
          </div>
        );
      case 'quiz':
        return (
          <QuizStep
            raffleId={params.id as string}
            onComplete={handleQuizComplete}
            ticketCount={finalTicketCount}
            totalAmount={calculateTotalAmount()}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            totalAmount={calculateTotalAmount()}
            ticketCount={finalTicketCount}
            multiplier={multiplier}
            bonusPercentage={bonusPercentage}
            onComplete={handlePaymentComplete}
          />
        );
      default:
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Gallery */}
              <div className="lg:col-span-2">
                <ImageGallery images={raffle.images} />

                {/* Brand Info */}
                <div className="mt-8 bg-[#1A1A1A] rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={raffle.brand.logo}
                      alt={raffle.brand.name}
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <h3 className="text-white font-medium">{raffle.brand.name}</h3>
                  </div>
                  <p className="text-gray-400">{raffle.brand.description}</p>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                  <InfoTabs raffle={raffle} />
                </div>
              </div>

              {/* Right Column - Details & Stats */}
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] rounded-lg p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">{raffle.title}</h1>
                  <p className="text-gray-400 mb-6">{raffle.description}</p>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Value</span>
                      <span className="text-[#3399FF] font-bold">
                        ${raffle.prizeValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ticket Price</span>
                      <span className="text-white font-bold">${raffle.ticketPrice}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-medium">Number of Tickets</span>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleTicketChange(false)}
                          className="bg-[#2A2A2A] text-white w-8 h-8 rounded-full hover:bg-[#3399FF] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-white">{baseTicketCount}</span>
                        <button
                          onClick={() => handleTicketChange(true)}
                          className="bg-[#2A2A2A] text-white w-8 h-8 rounded-full hover:bg-[#3399FF] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Current Odds</span>
                        <span className="text-white">{calculateOdds().toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Cost</span>
                        <span className="text-[#3399FF] font-bold">
                          ${(baseTicketCount * raffle.ticketPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleParticipate}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Participate Now
                  </button>
                </div>

                {/* Stats */}
                <StatsDisplay stats={raffle.stats} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1A1A1A] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center items-center space-x-4">
            {['overview', 'multiplier', 'quiz', 'payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      step === currentStep
                        ? 'bg-[#3399FF] text-white'
                        : index < ['overview', 'multiplier', 'quiz', 'payment'].indexOf(currentStep)
                          ? 'bg-green-500 text-white'
                          : 'bg-[#2A2A2A] text-gray-400'
                    }
                  `}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`
                      w-12 h-0.5 mx-2
                      ${
                        index < ['overview', 'multiplier', 'quiz', 'payment'].indexOf(currentStep)
                          ? 'bg-green-500'
                          : 'bg-[#2A2A2A]'
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="pb-20">{renderStep()}</div>
    </div>
  );
}
