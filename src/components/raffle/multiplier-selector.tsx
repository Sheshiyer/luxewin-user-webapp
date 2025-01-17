'use client';

import { useState } from 'react';

interface MultiplierOption {
  multiplier: number;
  bonus: number;
  description: string;
}

interface MultiplierSelectorProps {
  baseTickets: number;
  baseOdds: number;
  onSelect: (multiplier: number, bonus: number) => void;
  onNext: () => void;
}

export default function MultiplierSelector({
  baseTickets,
  baseOdds,
  onSelect,
  onNext,
}: MultiplierSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const multiplierOptions: MultiplierOption[] = [
    {
      multiplier: 1,
      bonus: 0,
      description: 'Standard Entry',
    },
    {
      multiplier: 2,
      bonus: 10,
      description: 'Double your tickets + 10% bonus odds',
    },
    {
      multiplier: 3,
      bonus: 20,
      description: 'Triple your tickets + 20% bonus odds',
    },
    {
      multiplier: 5,
      bonus: 35,
      description: '5x tickets + 35% bonus odds',
    },
  ];

  const calculateFinalOdds = (multiplier: number, bonus: number) => {
    const multipliedOdds = baseOdds * multiplier;
    const bonusIncrease = multipliedOdds * (bonus / 100);
    return (multipliedOdds + bonusIncrease).toFixed(2);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const option = multiplierOptions[index];
    onSelect(option.multiplier, option.bonus);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-white">Increase Your Chances</h2>
        <p className="text-gray-400">Select a multiplier to boost your winning odds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {multiplierOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`
              bg-[#1A1A1A] rounded-lg p-4 cursor-pointer transition-all border-2
              ${
                selectedOption === index
                  ? 'border-[#3399FF] bg-[#2A2A2A]'
                  : 'border-gray-800 hover:border-[#3399FF]/50'
              }
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">{option.multiplier}x Multiplier</h3>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
              {option.bonus > 0 && (
                <span className="bg-[#2A2A2A] text-[#3399FF] text-xs font-semibold px-2.5 py-0.5 rounded">
                  +{option.bonus}% Bonus
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Tickets:</span>
                <span className="font-bold text-white">{baseTickets * option.multiplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Final Odds:</span>
                <span className="font-bold text-[#3399FF]">
                  {calculateFinalOdds(option.multiplier, option.bonus)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={selectedOption === null}
        className={`
          w-full py-3 rounded-lg transition-colors mt-6
          ${
            selectedOption !== null
              ? 'bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white hover:opacity-90'
              : 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed'
          }
        `}
      >
        Continue to Quiz
      </button>
    </div>
  );
}
