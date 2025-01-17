export interface RaffleImage {
  url: string;
  alt: string;
  isThumbnail?: boolean;
}

import { SpecIcons } from '@/components/raffle/spec-icon';

export interface RaffleSpec {
  label: string;
  value: string;
  icon?: keyof typeof SpecIcons;
}

export interface RaffleFAQ {
  question: string;
  answer: string;
}

export interface RaffleWinner {
  name: string;
  avatar: string;
  prize: string;
  date: string;
  testimonial?: string;
  handoverImage?: string;
}

export interface RaffleStats {
  ticketsSold: number;
  totalTickets: number;
  participantsCount: number;
  endDate: string;
  recentParticipants: {
    name: string;
    avatar: string;
    ticketCount: number;
    timestamp: string;
  }[];
  popularNumbers: number[];
  geographicDistribution: {
    region: string;
    percentage: number;
  }[];
}

export interface RaffleDetails {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  images: RaffleImage[];
  endDate: string;
  ticketPrice: number;
  totalTickets: number;
  ticketsSold: number;
  prizeValue: number;
  brand: {
    name: string;
    logo: string;
    description: string;
  };
  specifications: RaffleSpec[];
  features: string[];
  rules: string[];
  faqs: RaffleFAQ[];
  stats: RaffleStats;
  previousWinners: RaffleWinner[];
  terms: string[];
  deliveryInfo: {
    method: string;
    locations: string[];
    estimatedTime: string;
    conditions: string[];
  };
}
