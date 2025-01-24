'use client';

import { useState } from 'react';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('blog');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Content Management</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['blog', 'announcements', 'media'].map(tab => (
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
        {activeTab === 'blog' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Blog Posts</h2>
              <div className="flex justify-end mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  New Post
                </button>
              </div>
              {/* Mobile View */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {/* Sample row */}
                  <div className="bg-[var(--background)] p-4 rounded-lg border border-gray-800/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--foreground)]">
                          Sample Blog Post
                        </h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-[var(--foreground)]/60">
                            Published on: 2024-01-20
                          </p>
                          <p className="text-xs text-[var(--foreground)]/60">Author: John Doe</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Published
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="px-3 py-1.5 text-xs bg-[var(--primary-color)] text-[var(--foreground)] rounded-lg hover:opacity-90">
                        Edit
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
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Sample row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        Sample Blog Post
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2024-01-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-red-500 hover:text-red-600">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Announcements
              </h2>
              <div className="flex justify-end mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  New Announcement
                </button>
              </div>
              <div className="space-y-4">
                {/* Sample announcement */}
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        System Maintenance
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Scheduled maintenance on January 25th
                      </p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Media Library
              </h2>
              <div className="flex justify-end mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Upload Media
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Sample media item */}
                <div className="relative group">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      sample-image.jpg
                    </p>
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
