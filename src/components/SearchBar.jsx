import React, { memo } from 'react';

// with this function we make sure the component doesn't re-render unless its props change
const SearchBar = memo(function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#788570]">
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
          className="w-full pl-11 pr-10 py-3 bg-white border border-[#d8dfd1] rounded-full text-[#1f291c] placeholder-[#8a9682] text-sm shadow-xs focus:outline-none focus:border-[#445e39] focus:ring-1 focus:ring-[#445e39] transition-all duration-200"
        />

        {/* small clear button when there is text */}
        {value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#788570] hover:text-[#1f291c] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
