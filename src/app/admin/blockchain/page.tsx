'use client';

import { useState } from 'react';

export default function BlockchainPage() {
  const [activeTab, setActiveTab] = useState('contracts');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Blockchain Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['contracts', 'verification', 'settlements'].map(tab => (
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
        {activeTab === 'contracts' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Smart Contracts
                </h2>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Deploy Contract
                </button>
              </div>
              {/* Mobile View */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {/* Sample row */}
                  <div className="bg-[var(--background)] p-4 rounded-lg border border-gray-800/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-[var(--foreground)]">
                            Raffle Contract
                          </h3>
                          <span className="text-xs text-[var(--foreground)]/60">0x1234...5678</span>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-[var(--foreground)]/60">
                            Network: Ethereum Mainnet
                          </p>
                          <p className="text-xs text-[var(--foreground)]/60">
                            Last Updated: 2024-01-20
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="px-3 py-1.5 text-xs bg-[var(--primary-color)] text-[var(--foreground)] rounded-lg hover:opacity-90">
                        Update
                      </button>
                      <button className="px-3 py-1.5 text-xs border border-gray-800/80 rounded-lg hover:bg-[var(--background-light)]">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Contract
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Network
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Sample row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Raffle Contract
                          </div>
                          <div className="ml-2 text-xs text-gray-500">0x1234...5678</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Ethereum Mainnet
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2024-01-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-red-500 hover:text-red-600 mr-3">Update</button>
                        <button className="text-gray-500 hover:text-gray-600">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Ticket Verification
              </h2>
              <div className="max-w-xl">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verify Ticket
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Enter ticket ID or hash..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                      Verify
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Sample verification result */}
                  <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg
                        className="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Valid Ticket
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>Ticket ID: #123456</p>
                      <p>Transaction Hash: 0xabcd...efgh</p>
                      <p>Issued: 2024-01-20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settlements' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Settlement Management
                </h2>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  New Settlement
                </button>
              </div>

              {/* Settlement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Pending Settlements
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Total Value (ETH)
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">12.5</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Gas Price (Gwei)
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">25</p>
                </div>
              </div>

              {/* Settlement List */}
              <div className="space-y-4">
                {/* Sample settlement */}
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Raffle #123 Payout
                        </h3>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Amount: 5 ETH</p>
                      <p className="text-xs text-gray-400 mt-1">Recipient: 0x9876...5432</p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">Process</button>
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
