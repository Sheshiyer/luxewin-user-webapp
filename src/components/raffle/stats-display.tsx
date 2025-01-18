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
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Bar */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
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
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-400">Total Participants</span>
          <span className="text-white tabular-nums">{stats.participantsCount}</span>
        </div>
      </div>

      {/* Time Left */}
      <div className="bg-[#1A1A1A] rounded-lg p-3 sm:p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs sm:text-sm">Time Left</span>
          <span className="text-[#3399FF] text-xs sm:text-sm font-medium">{timeLeft}</span>
        </div>
      </div>

      {/* Recent Participants */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-white text-sm sm:text-base font-medium">Recent Participants</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {stats.recentParticipants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1A1A1A] p-2 sm:p-3 rounded-lg"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={participant.avatar}
                    alt={participant.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm">{participant.name}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    {formatDistanceToNow(new Date(participant.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-[#2A2A2A] px-2 py-1 rounded shrink-0">
                <span className="text-[#3399FF] text-xs sm:text-sm tabular-nums">
                  {participant.ticketCount} tickets
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Numbers */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-white text-sm sm:text-base font-medium">Popular Numbers</h3>
        <div className="flex flex-wrap gap-2">
          {stats.popularNumbers.map((number, index) => (
            <div key={index} className="bg-[#1A1A1A] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              <span className="text-[#3399FF] text-xs sm:text-sm tabular-nums">#{number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-white text-sm sm:text-base font-medium">Geographic Distribution</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {stats.geographicDistribution.map((region, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">{region.region}</span>
                <span className="text-white tabular-nums">{region.percentage}%</span>
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
