import { RaffleDetails } from '@/types/raffle';

export const MOCK_RAFFLES: RaffleDetails[] = [
  // Rolex Daytona
  {
    id: '1',
    title: 'Rolex Daytona',
    description:
      "Experience the epitome of luxury with this Limited Edition Platinum Daytona featuring a custom diamond setting. This masterpiece combines Rolex's legendary craftsmanship with exclusive customization by renowned jewelers.",
    shortDescription: 'Limited Edition Platinum Daytona with custom diamond setting',
    images: [
      {
        url: '/images/rolex-daytona.png',
        alt: 'Rolex Daytona main view',
        isThumbnail: false,
      },
      {
        url: '/images/rolex-daytona.png',
        alt: 'Rolex Daytona side view',
        isThumbnail: true,
      },
      {
        url: '/images/rolex-daytona.png',
        alt: 'Rolex Daytona back view',
        isThumbnail: true,
      },
      {
        url: '/images/rolex-daytona.png',
        alt: 'Rolex Daytona on wrist',
        isThumbnail: true,
      },
    ],
    endDate: '2024-02-15',
    ticketPrice: 250,
    totalTickets: 1000,
    ticketsSold: 456,
    prizeValue: 45000,
    brand: {
      name: 'Rolex',
      logo: '/images/rolex-daytona.png',
      description:
        'Since 1905, Rolex has stood for luxury, precision, and excellence in watchmaking. The Daytona, introduced in 1963, is one of their most iconic models.',
    },
    specifications: [
      {
        label: 'Case Material',
        value: '950 Platinum',
        icon: 'case',
      },
      {
        label: 'Diameter',
        value: '40mm',
        icon: 'diameter',
      },
      {
        label: 'Movement',
        value: 'Automatic 4130',
        icon: 'movement',
      },
      {
        label: 'Water Resistance',
        value: '100m',
        icon: 'water',
      },
      {
        label: 'Dial',
        value: 'Ice Blue with Diamond Markers',
        icon: 'dial',
      },
      {
        label: 'Bracelet',
        value: 'Platinum Oyster',
        icon: 'bracelet',
      },
    ],
    features: [
      'Chronograph Function with 30-minute and 12-hour counters',
      'Tachymeter Scale on Bezel',
      'Custom Diamond Setting on Dial',
      'Scratch-resistant Sapphire Crystal',
      'Folding Oysterlock Safety Clasp',
      '72-hour Power Reserve',
    ],
    rules: [
      'Must be 18 or older to participate',
      'Limited to 100 tickets per person',
      'Winner will be drawn live on social media',
      'ID verification required for prize collection',
      'Entry void where prohibited by law',
    ],
    faqs: [
      {
        question: 'How is the winner selected?',
        answer:
          'Winners are selected through a transparent live draw using a certified random number generator, streamed live on our social media platforms.',
      },
      {
        question: 'When will I receive my tickets?',
        answer:
          "Tickets are issued instantly and sent to your registered email address. They're also visible in your dashboard immediately after purchase.",
      },
      {
        question: 'Is the watch brand new?',
        answer:
          'Yes, the Rolex Daytona comes brand new, unworn, with all original boxes, papers, and a 5-year international warranty.',
      },
    ],
    stats: {
      ticketsSold: 456,
      totalTickets: 1000,
      participantsCount: 234,
      endDate: '2024-02-15',
      recentParticipants: [
        {
          name: 'Alex M.',
          avatar: '/images/rolex-daytona.png',
          ticketCount: 5,
          timestamp: '2024-01-10T14:30:00Z',
        },
        {
          name: 'Sarah K.',
          avatar: '/images/rolex-daytona.png',
          ticketCount: 10,
          timestamp: '2024-01-10T13:45:00Z',
        },
        {
          name: 'James R.',
          avatar: '/images/rolex-daytona.png',
          ticketCount: 3,
          timestamp: '2024-01-10T13:15:00Z',
        },
      ],
      popularNumbers: [7, 13, 23, 77, 88, 99],
      geographicDistribution: [
        { region: 'North America', percentage: 45 },
        { region: 'Europe', percentage: 30 },
        { region: 'Asia', percentage: 15 },
        { region: 'Other', percentage: 10 },
      ],
    },
    previousWinners: [
      {
        name: 'Michael S.',
        avatar: '/avatars/winner1.png',
        prize: 'Rolex Submariner',
        date: '2023-12-01',
        testimonial:
          "Still can't believe I won! The process was smooth and transparent. Thank you Eliteprize!",
        handoverImage: '/images/handovers/rolex-handover1.png',
      },
      {
        name: 'Emma L.',
        avatar: '/avatars/winner2.png',
        prize: 'Patek Philippe Nautilus',
        date: '2023-11-15',
        testimonial: 'Dreams do come true! Amazing experience from start to finish.',
        handoverImage: '/images/handovers/patek-handover1.png',
      },
    ],
    terms: [
      'Prize is non-transferable and cannot be exchanged for cash',
      'Winner is responsible for any applicable taxes',
      'Delivery or collection to be arranged within 30 days of draw',
      "Eliteprize reserves the right to verify winner's identity and eligibility",
      'By entering, participants agree to be featured in promotional materials',
    ],
    deliveryInfo: {
      method: 'Secure Courier or Collection',
      locations: ['North America', 'Europe', 'Asia', 'Australia'],
      estimatedTime: '7-14 business days',
      conditions: [
        'Signature required upon delivery',
        'Full insurance coverage during transit',
        'Collection available from authorized Rolex dealers',
        'Identity verification required',
      ],
    },
  },
  // Luxury Villa in Bali
  {
    id: '2',
    title: 'Luxury Villa in Bali',
    description:
      'Experience paradise in this stunning 5-bedroom beachfront villa with private pool and full staff. Located in the most exclusive area of Bali, this villa combines modern luxury with traditional Balinese architecture.',
    shortDescription: '5-bedroom beachfront villa with private pool and staff',
    images: [
      {
        url: '/images/luxury-villa.png',
        alt: 'Luxury Villa main view',
        isThumbnail: false,
      },
      {
        url: '/images/luxury-villa.png',
        alt: 'Villa pool view',
        isThumbnail: true,
      },
      {
        url: '/images/luxury-villa.png',
        alt: 'Villa interior',
        isThumbnail: true,
      },
      {
        url: '/images/luxury-villa.png',
        alt: 'Villa beach view',
        isThumbnail: true,
      },
    ],
    endDate: '2024-02-20',
    ticketPrice: 500,
    totalTickets: 2000,
    ticketsSold: 892,
    prizeValue: 2500000,
    brand: {
      name: 'Luxury Bali Estates',
      logo: '/images/luxury-villa.png',
      description:
        'Premier luxury real estate developer in Bali, known for creating exceptional beachfront properties that blend luxury with local culture.',
    },
    specifications: [
      {
        label: 'Land Size',
        value: '2000 sqm',
        icon: 'case',
      },
      {
        label: 'Bedrooms',
        value: '5 En-suite',
        icon: 'diameter',
      },
      {
        label: 'Pool',
        value: '25m Infinity',
        icon: 'water',
      },
      {
        label: 'Staff',
        value: 'Full-time',
        icon: 'movement',
      },
      {
        label: 'Beach Access',
        value: 'Private',
        icon: 'dial',
      },
      {
        label: 'Security',
        value: '24/7 Gated',
        icon: 'bracelet',
      },
    ],
    features: [
      'Infinity pool overlooking the ocean',
      'Fully equipped gourmet kitchen',
      'Home theater and entertainment room',
      'Private beach access',
      'Tropical garden with yoga pavilion',
      'Staff quarters with full-time team',
    ],
    rules: [
      'Must be 18 or older to participate',
      'Limited to 50 tickets per person',
      'Winner will be drawn live on social media',
      'Property transfer fees included',
      'Entry void where prohibited by law',
    ],
    faqs: [
      {
        question: 'Is the property fully furnished?',
        answer:
          'Yes, the villa comes fully furnished with luxury furniture and appliances, ready for immediate occupancy.',
      },
      {
        question: 'Are there any additional costs?',
        answer:
          "All property transfer fees and first year's maintenance are included in the prize.",
      },
      {
        question: 'Can I rent out the villa?',
        answer:
          'Yes, the villa is approved for luxury vacation rentals and comes with established booking channels.',
      },
    ],
    stats: {
      ticketsSold: 892,
      totalTickets: 2000,
      participantsCount: 445,
      endDate: '2024-02-20',
      recentParticipants: [
        {
          name: 'David L.',
          avatar: '/images/luxury-villa.png',
          ticketCount: 15,
          timestamp: '2024-01-10T14:30:00Z',
        },
        {
          name: 'Maria S.',
          avatar: '/images/luxury-villa.png',
          ticketCount: 20,
          timestamp: '2024-01-10T13:45:00Z',
        },
        {
          name: 'Robert K.',
          avatar: '/images/luxury-villa.png',
          ticketCount: 8,
          timestamp: '2024-01-10T13:15:00Z',
        },
      ],
      popularNumbers: [8, 18, 28, 88, 98, 188],
      geographicDistribution: [
        { region: 'Asia Pacific', percentage: 45 },
        { region: 'Europe', percentage: 25 },
        { region: 'North America', percentage: 20 },
        { region: 'Other', percentage: 10 },
      ],
    },
    previousWinners: [
      {
        name: 'Thomas R.',
        avatar: '/images/luxury-villa.png',
        prize: 'Beachfront Villa Seminyak',
        date: '2023-11-15',
        testimonial:
          'A dream come true! The villa exceeded all expectations. The team made the transfer process seamless.',
        handoverImage: '/images/luxury-villa.png',
      },
    ],
    terms: [
      'Prize includes property transfer fees and taxes',
      'One year of property management included',
      'Winner must complete transfer within 60 days',
      'Property cannot be exchanged for cash value',
      'Local property ownership laws apply',
    ],
    deliveryInfo: {
      method: 'Property Transfer',
      locations: ['Global ownership available'],
      estimatedTime: '60 days for transfer completion',
      conditions: [
        'Winner must provide necessary documentation',
        'Legal support provided for transfer',
        'Property management handover included',
        'Local bank account may be required',
      ],
    },
  },
  // Ferrari F8 Tributo
  {
    id: '3',
    title: 'Ferrari F8 Tributo',
    description:
      'Experience pure automotive excellence with this 2023 Ferrari F8 Tributo, featuring a custom interior and track package. This masterpiece of Italian engineering delivers unmatched performance and luxury.',
    shortDescription: '2023 Model with custom interior and track package',
    images: [
      {
        url: '/images/ferrari-f8.png',
        alt: 'Ferrari F8 main view',
        isThumbnail: false,
      },
      {
        url: '/images/ferrari-f8.png',
        alt: 'Ferrari F8 side view',
        isThumbnail: true,
      },
      {
        url: '/images/ferrari-f8.png',
        alt: 'Ferrari F8 interior',
        isThumbnail: true,
      },
      {
        url: '/images/ferrari-f8.png',
        alt: 'Ferrari F8 rear view',
        isThumbnail: true,
      },
    ],
    endDate: '2024-03-01',
    ticketPrice: 1000,
    totalTickets: 5000,
    ticketsSold: 2341,
    prizeValue: 350000,
    brand: {
      name: 'Ferrari',
      logo: '/images/ferrari-f8.png',
      description:
        'Since 1947, Ferrari has been the epitome of automotive excellence, creating vehicles that combine performance, luxury, and Italian craftsmanship.',
    },
    specifications: [
      {
        label: 'Engine',
        value: '3.9L V8 Twin-Turbo',
        icon: 'case',
      },
      {
        label: 'Power',
        value: '710 HP',
        icon: 'diameter',
      },
      {
        label: '0-60 mph',
        value: '2.9 seconds',
        icon: 'movement',
      },
      {
        label: 'Top Speed',
        value: '211 mph',
        icon: 'water',
      },
      {
        label: 'Transmission',
        value: '7-speed F1 DCT',
        icon: 'dial',
      },
      {
        label: 'Weight',
        value: '1,435 kg',
        icon: 'bracelet',
      },
    ],
    features: [
      'Carbon fiber racing package',
      'Custom interior with Alcantara',
      'Advanced driver assistance systems',
      '20-inch forged wheels',
      'Premium sound system',
      'Track telemetry system',
    ],
    rules: [
      'Must be 18 or older to participate',
      "Valid driver's license required",
      'Winner will be drawn live on social media',
      'Insurance and registration fees included',
      'Entry void where prohibited by law',
    ],
    faqs: [
      {
        question: 'Is the car brand new?',
        answer:
          'Yes, the Ferrari F8 Tributo is brand new with delivery mileage only, full warranty, and official Ferrari maintenance program.',
      },
      {
        question: "What's included in the prize?",
        answer:
          "The prize includes the car, registration, first year's insurance, and Ferrari's 7-year maintenance program.",
      },
      {
        question: 'Can I choose the color?',
        answer:
          'The car comes in Rosso Corsa with the specified custom interior. Color changes are not available.',
      },
    ],
    stats: {
      ticketsSold: 2341,
      totalTickets: 5000,
      participantsCount: 890,
      endDate: '2024-03-01',
      recentParticipants: [
        {
          name: 'Chris P.',
          avatar: '/images/ferrari-f8.png',
          ticketCount: 25,
          timestamp: '2024-01-10T14:30:00Z',
        },
        {
          name: 'Lisa M.',
          avatar: '/images/ferrari-f8.png',
          ticketCount: 30,
          timestamp: '2024-01-10T13:45:00Z',
        },
        {
          name: 'Kevin T.',
          avatar: '/images/ferrari-f8.png',
          ticketCount: 15,
          timestamp: '2024-01-10T13:15:00Z',
        },
      ],
      popularNumbers: [8, 88, 188, 288, 888, 1888],
      geographicDistribution: [
        { region: 'Europe', percentage: 40 },
        { region: 'North America', percentage: 35 },
        { region: 'Middle East', percentage: 15 },
        { region: 'Other', percentage: 10 },
      ],
    },
    previousWinners: [
      {
        name: 'Richard M.',
        avatar: '/images/ferrari-f8.png',
        prize: 'Ferrari 488 Pista',
        date: '2023-10-15',
        testimonial: "The most incredible car I've ever owned. The whole experience was fantastic!",
        handoverImage: '/images/ferrari-f8.png',
      },
    ],
    terms: [
      'Prize includes vehicle registration and taxes',
      'First year insurance included',
      '7-year maintenance program included',
      'Prize cannot be exchanged for cash value',
      'Winner responsible for ongoing costs',
    ],
    deliveryInfo: {
      method: 'Ferrari Dealership Collection',
      locations: ['Global delivery available'],
      estimatedTime: '30-45 days',
      conditions: [
        "Valid driver's license required",
        'Insurance documentation needed',
        'Collection from nearest Ferrari dealership',
        'Delivery to alternate location available',
      ],
    },
  },
];
