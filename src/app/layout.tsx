import { Open_Sans, Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import '@/styles/globals.css';

const fontSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'LuxeWin - Premium Raffle Platform',
  description: 'Experience premium raffles with guaranteed authenticity and transparency.',
  keywords: ['raffle', 'luxury', 'premium', 'contest', 'win', 'prizes'],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontHeading.variable} dark:bg-gray-900`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
