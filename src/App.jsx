import React from 'react';
import Gallery from './components/Gallery';

/**
 * Main application component.
 * Sets up page layout and renders the Photo Gallery.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Photo Gallery
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Explore 30 curated photos from Picsum API
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Gallery />
      </main>
    </div>
  );
}
