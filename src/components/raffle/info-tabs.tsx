'use client';

import { useState } from 'react';
import { RaffleDetails } from '@/types/raffle';
import { format } from 'date-fns';
import SpecIcon from './spec-icon';
import Image from 'next/image';

interface InfoTabsProps {
  raffle: RaffleDetails;
}

export default function InfoTabs({ raffle }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState('specs');

  const tabs = [
    { id: 'specs', label: 'Specifications' },
    { id: 'features', label: 'Features' },
    { id: 'rules', label: 'Rules' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'winners', label: 'Winners' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raffle.specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-3 bg-[#1A1A1A] p-4 rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2A2A2A] rounded-full">
                  <span className="text-[#3399FF]">
                    <SpecIcon name={spec.icon || 'case'} />
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{spec.label}</p>
                  <p className="text-white font-medium">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            {raffle.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 bg-[#1A1A1A] p-4 rounded-lg">
                <div className="w-6 h-6 flex items-center justify-center bg-[#2A2A2A] rounded-full mt-0.5">
                  <span className="text-[#3399FF] text-sm">{index + 1}</span>
                </div>
                <p className="text-white">{feature}</p>
              </div>
            ))}
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-4">
            {raffle.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3 bg-[#1A1A1A] p-4 rounded-lg">
                <div className="w-6 h-6 flex items-center justify-center bg-[#2A2A2A] rounded-full mt-0.5">
                  <span className="text-[#3399FF] text-sm">!</span>
                </div>
                <p className="text-white">{rule}</p>
              </div>
            ))}
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-4">
            {raffle.faqs.map((faq, index) => (
              <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg space-y-2">
                <p className="text-[#3399FF] font-medium">{faq.question}</p>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'winners':
        return (
          <div className="space-y-6">
            {raffle.previousWinners.map((winner, index) => (
              <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={winner.avatar} alt={winner.name} className="object-cover" fill />
                  </div>
                  <div>
                    <p className="text-white font-medium">{winner.name}</p>
                    <p className="text-[#3399FF]">{winner.prize}</p>
                    <p className="text-gray-400 text-sm">
                      {format(new Date(winner.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                {winner.testimonial && (
                  <p className="text-gray-300 italic">&quot;{winner.testimonial}&quot;</p>
                )}
                {winner.handoverImage && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <Image
                      src={winner.handoverImage}
                      alt={`${winner.name} receiving prize`}
                      className="object-cover"
                      fill
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg whitespace-nowrap transition-all
              ${
                activeTab === tab.id
                  ? 'bg-[#3399FF] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">{renderTabContent()}</div>
    </div>
  );
}
