import React from 'react';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Minimalist Top Header */}
      <header className="border-b border-neutral-800/80 sticky top-0 z-20 backdrop-blur-xl bg-[#0a0a0a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-0.5">
                Curated Collection
              </p>
              <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white">
                Photo Gallery
              </h1>
            </div>
            <div className="text-right">
              
            </div>
          </div>
        </div>
      </header>

      {/* Main Gallery Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Gallery />
      </main>
    </div>
  );
}
