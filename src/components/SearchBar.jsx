import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by author name..."
          className="w-full pl-11 pr-10 py-3 bg-neutral-900/90 border border-neutral-800 rounded-full text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all duration-200"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-white transition-colors"
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
