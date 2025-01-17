import { Open_Sans, Poppins } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import '@/styles/globals.css'

const fontSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'LuxeWin - Premium Raffle Platform',
  description: 'Experience premium raffles with guaranteed authenticity and transparency.',
  keywords: ['raffle', 'luxury', 'premium', 'contest', 'win', 'prizes'],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontHeading.variable}`}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
