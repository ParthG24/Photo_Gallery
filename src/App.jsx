import React from 'react';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f0] text-[#1f291c] flex flex-col font-sans selection:bg-[#dce5d4] selection:text-[#1f291c]">
      {/* clean top header */}
      <header className="border-b border-[#e2e7dc] sticky top-0 z-20 backdrop-blur-md bg-[#f4f6f0]/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5f6d57] font-semibold mb-0.5">
                Curated Collection
              </p>
              <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-[#1f291c]">
                Photo Gallery
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#e8eee2] text-[#3e5633] border border-[#d6dfce]">
                30 Works
              </span>
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
