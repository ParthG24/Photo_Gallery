import React from 'react';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900">
      {/* Clean Minimalist Header */}
      <header className="border-b border-zinc-200/80 sticky top-0 z-20 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 font-semibold mb-0.5">
                Curated Collection
              </p>
              <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-900">
                Photo Gallery
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-zinc-400">
                30 Works
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Gallery />
      </main>
    </div>
  );
}
