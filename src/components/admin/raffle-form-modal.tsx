'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RaffleFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalTickets: number;
  price: number;
  images: string[];
  specifications: {
    key: string;
    value: string;
  }[];
}

interface RaffleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RaffleFormData) => void;
  initialData?: Partial<RaffleFormData>;
}

export default function RaffleFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: RaffleFormModalProps) {
  const [formData, setFormData] = useState<RaffleFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    totalTickets: initialData?.totalTickets || 1000,
    price: initialData?.price || 99.99,
    images: initialData?.images || [],
    specifications: initialData?.specifications || [{ key: '', value: '' }],
  });

  const [currentTab, setCurrentTab] = useState<'basic' | 'specs' | 'images'>('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-[var(--background)] rounded-xl shadow-xl">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-[var(--foreground)]">
              {initialData ? 'Edit Raffle' : 'Create New Raffle'}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setCurrentTab('basic')}
                className={`px-4 py-2 text-sm font-medium ${
                  currentTab === 'basic'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
                }`}
              >
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('specs')}
                className={`px-4 py-2 text-sm font-medium ${
                  currentTab === 'specs'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
                }`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('images')}
                className={`px-4 py-2 text-sm font-medium ${
                  currentTab === 'images'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
                }`}
              >
                Images
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Basic Info Tab */}
              {currentTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, description: e.target.value }))
                      }
                      rows={4}
                      className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)]">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, startDate: e.target.value }))
                        }
                        className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)]">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)]">
                        Total Tickets
                      </label>
                      <input
                        type="number"
                        value={formData.totalTickets}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, totalTickets: parseInt(e.target.value) }))
                        }
                        min="1"
                        className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)]">
                        Price per Ticket
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))
                        }
                        min="0.01"
                        step="0.01"
                        className="w-full px-4 py-2 mt-1 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {currentTab === 'specs' && (
                <div className="space-y-4">
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={e => updateSpecification(index, 'key', e.target.value)}
                        placeholder="Key"
                        className="flex-1 px-4 py-2 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={e => updateSpecification(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-4 py-2 text-sm border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--background)] text-[var(--foreground)]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="p-2 text-[var(--primary-color)] hover:opacity-80"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center px-4 py-2 text-sm text-[var(--primary-color)] border border-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color)]/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add Specification
                  </button>
                </div>
              )}

              {/* Images Tab */}
              {currentTab === 'images' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video bg-[var(--background-light)] rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt="Raffle item preview"
                          width={400}
                          height={225}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }
                          className="absolute top-2 right-2 p-1 bg-[var(--primary-color)] text-[var(--foreground)] rounded-full hover:opacity-80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-[var(--background-light)]/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 mb-4 text-[var(--foreground)]/60"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-[var(--foreground)]/60">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-[var(--foreground)]/60">
                          PNG, JPG or WEBP (MAX. 800x400px)
                        </p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" multiple />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-800">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-[var(--foreground)] bg-[var(--background)] border border-gray-800 rounded-lg hover:bg-[var(--background-light)]/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-[var(--foreground)] bg-[var(--primary-color)] rounded-lg hover:opacity-90"
                >
                  {initialData ? 'Save Changes' : 'Create Raffle'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
