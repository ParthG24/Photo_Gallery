import React from 'react';

/**
 * LoadingSpinner component displayed while fetching photos.
 * Built purely with Tailwind CSS (no external component libraries).
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Animated Tailwind Spinner */}
      <div
        className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading photos"
      />
      <p className="mt-4 text-sm font-medium text-gray-600 tracking-wide">
        Loading 30 photos from Picsum...
      </p>
    </div>
  );
}
