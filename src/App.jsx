import React from 'react';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f0] text-[#1f291c] flex flex-col font-sans selection:bg-[#dce5d4] selection:text-[#1f291c]">
      {/* clean top header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#f4f6f0]/90 border-b border-[#e2e7dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* brand icon & bold title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#445e39] text-white flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1f291c]">
                Photo Gallery
              </h1>
            </div>

            {/* status pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#d8dfd1] shadow-xs text-xs text-[#3e5633] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#445e39] animate-pulse" />
              <span>30 Photos</span>
            </div>
          </div>
        </div>
      </header>

      {/* main content area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Gallery />
      </main>
    </div>
  );
}
