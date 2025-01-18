'use client';

interface PublishConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  raffleName: string;
}

export default function PublishConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  raffleName,
}: PublishConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Publish Raffle</h3>
          </div>

          <div className="px-6 py-4">
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to publish{' '}
                <span className="font-medium text-gray-900 dark:text-white">{raffleName}</span>?
                This action cannot be undone.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Publishing this raffle will:
                </p>
                <ul className="ml-4 space-y-1 text-sm text-gray-500 dark:text-gray-400 list-disc">
                  <li>Make it visible to all users</li>
                  <li>Allow users to purchase tickets</li>
                  <li>Start the raffle according to the scheduled date</li>
                  <li>Begin blockchain verification processes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Publish Raffle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
