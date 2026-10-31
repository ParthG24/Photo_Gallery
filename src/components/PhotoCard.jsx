import React, { useState } from 'react';

/**
 * PhotoCard component represents an individual card in the responsive gallery grid.
 * Displays the image, author name, and a heart button to toggle favourite status.
 *
 * @param {{
 *   photo: { id: string, author: string, download_url: string },
 *   isFavourite: boolean,
 *   onToggleFavourite: (id: string) => void
 * }} props
 */
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Use Picsum 600x400 optimized thumbnail for fast grid rendering,
  // falling back to photo.download_url if needed.
  const [imgSrc, setImgSrc] = useState(
    `https://picsum.photos/id/${photo.id}/600/400`
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onError={() => setImgSrc(photo.download_url)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Floating Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
            isFavourite
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 scale-105'
              : 'bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <svg
            className="w-5 h-5 transition-transform active:scale-125"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Photographer
          </p>
          <h3
            className="text-sm font-semibold text-gray-800 truncate"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Small badge showing favourite status */}
        {isFavourite && (
          <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
            Favourited
          </span>
        )}
      </div>
    </div>
  );
}
