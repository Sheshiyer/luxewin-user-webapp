interface ErrorProps {
  message?: string
  retry?: () => void
}

export function Error({ message = 'Something went wrong', retry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-error text-6xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{message}</h1>
      {retry && (
        <button
          onClick={retry}
          className="button-primary"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
