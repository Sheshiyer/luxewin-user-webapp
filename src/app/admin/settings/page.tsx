'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">System Settings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['general', 'features', 'monitoring', 'backup'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Sections */}
      <div className="mt-6">
        {activeTab === 'general' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">
                General Settings
              </h2>
              <div className="space-y-6">
                {/* Site Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Site Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        defaultValue="Eliteprize"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        defaultValue="support@Eliteprize.com"
                      />
                    </div>
                  </div>
                </div>

                {/* API Configuration */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    API Configuration
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        API Endpoint
                      </label>
                      <input
                        type="text"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        defaultValue="https://api.Eliteprize.com/v1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        API Key
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="password"
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                          value="••••••••••••••••"
                          readOnly
                        />
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                          Regenerate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">
              Feature Management
            </h2>
            <div className="space-y-6">
              {/* Feature Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Public Raffles
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow users to view and participate in raffles
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-500 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      User Registration
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow new user registrations
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable site maintenance mode
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  System Monitoring
                </h2>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  View Logs
                </button>
              </div>

              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    CPU Usage
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">45%</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Memory Usage
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">2.5GB</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Storage
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">75%</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Recent Alerts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        High Memory Usage
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Memory usage exceeded 80% threshold
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Backup Management
              </h2>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Create Backup
              </button>
            </div>

            {/* Backup Schedule */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Backup Schedule
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Frequency
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Retention Period
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
                    <option>7 Days</option>
                    <option>30 Days</option>
                    <option>90 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recent Backups */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Recent Backups
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Full System Backup
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Size: 2.5GB</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2024-01-20 12:00:00</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-red-500 hover:text-red-600">Download</button>
                    <button className="text-gray-500 hover:text-gray-600">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
