import React, { memo } from 'react';

const PhotoCard = memo(function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="group bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col">
      <div className="relative aspect-4/3 w-full bg-zinc-100 overflow-hidden">
        {/* Photo with lazy loading */}
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Heart icon button to toggle favourite */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
            isFavourite
              ? 'bg-white/95 border-rose-200 text-rose-500 shadow-sm scale-105'
              : 'bg-white/85 border-white/60 text-zinc-400 hover:text-zinc-800 hover:bg-white hover:scale-105 shadow-xs'
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

      {/* Card details */}
      <div className="p-4 flex items-center justify-between border-t border-zinc-100">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
            Photographer
          </p>
          <h3 className="text-sm font-medium text-zinc-800 truncate group-hover:text-zinc-950 transition-colors">
            {photo.author}
          </h3>
        </div>

        {isFavourite && (
          <span className="shrink-0 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
            Saved
          </span>
        )}
      </div>
    </div>
  );
});

export default PhotoCard;
