'use client';

import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';

interface NotificationSettings {
  raffleUpdates: boolean;
  winningAlerts: boolean;
  promotionalEmails: boolean;
  priceAlerts: boolean;
}

interface DisplaySettings {
  darkMode: boolean;
  compactView: boolean;
  showBalance: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    raffleUpdates: true,
    winningAlerts: true,
    promotionalEmails: false,
    priceAlerts: true,
  });
  const [display, setDisplay] = useState<DisplaySettings>({
    darkMode: true,
    compactView: false,
    showBalance: true,
  });
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 ${
        enabled ? 'bg-[var(--primary-color)]' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="flex items-center space-x-4">
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
                <button className="text-sm text-[var(--primary-color)] hover:text-[var(--primary-color)]/80">
                  Change Email
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Member Since
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
            </div>
            <div>
              <button className="text-sm text-[var(--primary-color)] hover:text-[var(--primary-color)]/80">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notification Settings
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Raffle Updates</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about raffle status changes and deadlines
                </p>
              </div>
              <Toggle
                enabled={notifications.raffleUpdates}
                onChange={() =>
                  setNotifications(prev => ({ ...prev, raffleUpdates: !prev.raffleUpdates }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Winning Alerts</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instant notifications when you win a raffle
                </p>
              </div>
              <Toggle
                enabled={notifications.winningAlerts}
                onChange={() =>
                  setNotifications(prev => ({ ...prev, winningAlerts: !prev.winningAlerts }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Price Alerts</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about special ticket prices and discounts
                </p>
              </div>
              <Toggle
                enabled={notifications.priceAlerts}
                onChange={() =>
                  setNotifications(prev => ({ ...prev, priceAlerts: !prev.priceAlerts }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">
                  Promotional Emails
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive news about upcoming raffles and special offers
                </p>
              </div>
              <Toggle
                enabled={notifications.promotionalEmails}
                onChange={() =>
                  setNotifications(prev => ({
                    ...prev,
                    promotionalEmails: !prev.promotionalEmails,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Display Settings
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Dark Mode</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <Toggle
                enabled={display.darkMode}
                onChange={() => setDisplay(prev => ({ ...prev, darkMode: !prev.darkMode }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Compact View</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show more content with reduced spacing
                </p>
              </div>
              <Toggle
                enabled={display.compactView}
                onChange={() => setDisplay(prev => ({ ...prev, compactView: !prev.compactView }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Show Balance</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Display your account balance in the header
                </p>
              </div>
              <Toggle
                enabled={display.showBalance}
                onChange={() => setDisplay(prev => ({ ...prev, showBalance: !prev.showBalance }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security Settings
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Toggle
                enabled={security.twoFactorAuth}
                onChange={() =>
                  setSecurity(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">Login Alerts</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified of new sign-ins to your account
                </p>
              </div>
              <Toggle
                enabled={security.loginAlerts}
                onChange={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
              />
            </div>
            <div className="pt-4 border-t dark:border-gray-700">
              <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
