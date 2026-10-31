import React, { memo } from 'react';

// with this function we make sure the component doesn't re-render unless its props change
const PhotoCard = memo(function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="group bg-white border border-[#e2e7dc] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#bcc7b3] transition-all duration-300 flex flex-col">
      <div className="relative aspect-4/3 w-full bg-[#edf1e8] overflow-hidden">
        {/* photo thumbnail with lazy loading */}
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* heart button to toggle favourite status */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
            isFavourite
              ? 'bg-[#eef3ea] border-[#c4d1bc] text-[#3e5633] shadow-xs scale-105'
              : 'bg-white/90 border-[#e2e7dc] text-[#8a9682] hover:text-[#3e5633] hover:bg-white hover:scale-105 shadow-xs'
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

      <div className="p-4 flex items-center justify-between border-t border-[#edf1e8]">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] uppercase tracking-wider text-[#788570] font-medium">
            Photographer
          </p>
          <h3 className="text-sm font-medium text-[#1f291c] truncate group-hover:text-[#3e5633] transition-colors">
            {photo.author}
          </h3>
        </div>

        {isFavourite && (
          <span className="shrink-0 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#eef3ea] text-[#3e5633] border border-[#d3decb]">
            Saved
          </span>
        )}
      </div>
    </div>
  );
});

export default PhotoCard;
