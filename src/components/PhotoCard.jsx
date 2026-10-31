import React, { useState } from 'react';

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imgSrc, setImgSrc] = useState(
    `https://picsum.photos/id/${photo.id}/600/400`
  );

  return (
    <div className="group bg-neutral-900/70 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 flex flex-col">
      <div className="relative aspect-4/3 w-full bg-neutral-950 overflow-hidden">
        <img
          src={imgSrc}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onError={() => setImgSrc(photo.download_url)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Heart icon button to toggle favourites */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
            isFavourite
              ? 'bg-red-500/15 border-red-500/40 text-red-500 scale-105'
              : 'bg-black/50 border-white/10 text-neutral-400 hover:text-white hover:bg-black/80 hover:scale-105'
          }`}
        >
          <svg
            className="w-4 h-4 transition-transform active:scale-125"
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

      <div className="p-4 flex items-center justify-between border-t border-neutral-800/60">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
            Photographer
          </p>
          <h3 className="text-sm font-medium text-neutral-200 truncate group-hover:text-white transition-colors">
            {photo.author}
          </h3>
        </div>

        {isFavourite && (
          <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
