'use client';

import { useEffect, useState } from 'react';
import { notificationService } from '@/lib/notifications';

export default function NotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if notifications are supported and not already granted
    if ('Notification' in window && Notification.permission === 'default') {
      setShowPrompt(true);
    }
  }, []);

  const handleEnable = async () => {
    try {
      await notificationService.init();
      setShowPrompt(false);
    } catch (error) {
      console.error('Error enabling notifications:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900">Enable Notifications</h3>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with the latest raffle results and important updates.
          </p>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleEnable}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enable
            </button>
            <button
              onClick={handleDismiss}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
