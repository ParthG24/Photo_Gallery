import React from 'react';

/**
 * SearchBar component for filtering photos by author name in real-time.
 *
 * @param {{ value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }} props
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        {/* Search magnifying glass icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by author name..."
          aria-label="Search photos by author name"
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition duration-150 text-sm sm:text-base"
        />

        {/* Optional clear button when user has typed something */}
        {value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
