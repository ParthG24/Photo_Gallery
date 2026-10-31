import React from 'react';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f0] text-[#1f291c] flex flex-col font-sans selection:bg-[#dce5d4] selection:text-[#1f291c]">
      {/* clean top header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#f4f6f0]/90 border-b border-[#e2e7dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-2xl font-bold tracking-tight text-[#1f291c]">
            Photo Gallery
          </h1>
        </div>
      </header>

      {/* main content area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Gallery />
      </main>
    </div>
  );
}
