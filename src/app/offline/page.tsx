import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You&apos;re Offline</h1>
        <p className="text-lg mb-8">Please check your internet connection and try again.</p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
