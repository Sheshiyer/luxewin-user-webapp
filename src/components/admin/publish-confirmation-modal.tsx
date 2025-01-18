'use client';

interface PublishConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  raffleName: string;
}

// Temporary empty component while modal is disabled
export default function PublishConfirmationModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onConfirm,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  raffleName,
}: PublishConfirmationModalProps) {
  return null;
}

// Original modal implementation commented out
/*
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-[var(--background)] rounded-xl shadow-xl">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-[var(--foreground)]">Publish Raffle</h3>
          </div>

          <div className="px-6 py-4">
            <div className="mt-2">
              <p className="text-sm text-[var(--foreground)]/60">
                Are you sure you want to publish{' '}
                <span className="font-medium text-[var(--foreground)]">{raffleName}</span>? This action cannot be undone
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-[var(--foreground)]/60">Publishing this raffle will:</p>
                <ul className="ml-4 space-y-1 text-sm text-[var(--foreground)]/60 list-disc">
                  <li>Make it visible to all users</li>
                  <li>Allow users to purchase tickets</li>
                  <li>Start the raffle according to the scheduled date</li>
                  <li>Begin blockchain verification processes</li>
                </ul>
              </div>
            </div>
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
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm text-[var(--foreground)] bg-[var(--success)] rounded-lg hover:opacity-90"
              >
                Publish Raffle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
*/
