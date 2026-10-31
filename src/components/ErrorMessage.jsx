import React from 'react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-14 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl text-center">
      <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-neutral-800 text-neutral-300 mb-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-sm font-medium text-neutral-200 mb-1">
        Unable to load photos
      </h3>
      <p className="text-xs text-neutral-400 mb-4">
        {message || 'Something went wrong while fetching photos.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}
