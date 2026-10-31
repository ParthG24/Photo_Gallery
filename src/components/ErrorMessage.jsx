import React from 'react';

/**
 * ErrorMessage component displayed when data fetching fails.
 *
 * @param {{ message: string, onRetry?: () => void }} props
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm">
      <div className="w-12 h-12 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-red-800 mb-1">
        Unable to Load Photos
      </h3>
      <p className="text-sm text-red-600 mb-4">
        {message || 'An unexpected error occurred while fetching photos.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
