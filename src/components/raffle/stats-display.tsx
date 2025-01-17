'use client';

import { RaffleStats } from '@/types/raffle';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface StatsDisplayProps {
  stats: RaffleStats;
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  const percentageSold = (stats.ticketsSold / stats.totalTickets) * 100;
  const timeLeft = formatDistanceToNow(new Date(stats.endDate), { addSuffix: true });

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Tickets Sold</span>
          <span className="text-white font-medium">
            {stats.ticketsSold} / {stats.totalTickets}
          </span>
        </div>
        <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3399FF] to-[#00FFCC] transition-all duration-500"
            style={{ width: `${percentageSold}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Participants</span>
          <span className="text-white">{stats.participantsCount}</span>
        </div>
      </div>

      {/* Time Left */}
      <div className="bg-[#1A1A1A] rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Time Left</span>
          <span className="text-[#3399FF] font-medium">{timeLeft}</span>
        </div>
      </div>

      {/* Recent Participants */}
      <div className="space-y-3">
        <h3 className="text-white font-medium">Recent Participants</h3>
        <div className="space-y-2">
          {stats.recentParticipants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={participant.avatar}
                    alt={participant.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <p className="text-white text-sm">{participant.name}</p>
                  <p className="text-gray-400 text-xs">
                    {formatDistanceToNow(new Date(participant.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-[#2A2A2A] px-2 py-1 rounded">
                <span className="text-[#3399FF] text-sm">{participant.ticketCount} tickets</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Numbers */}
      <div className="space-y-3">
        <h3 className="text-white font-medium">Popular Numbers</h3>
        <div className="flex flex-wrap gap-2">
          {stats.popularNumbers.map((number, index) => (
            <div key={index} className="bg-[#1A1A1A] px-3 py-1.5 rounded-full">
              <span className="text-[#3399FF]">#{number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="space-y-3">
        <h3 className="text-white font-medium">Geographic Distribution</h3>
        <div className="space-y-2">
          {stats.geographicDistribution.map((region, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{region.region}</span>
                <span className="text-white">{region.percentage}%</span>
              </div>
              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3399FF] transition-all duration-500"
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
