import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-8 h-8 border-2 border-neutral-800 border-t-neutral-200 rounded-full animate-spin" />
      <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400 font-medium">
        Loading Photos...
      </p>
    </div>
  );
}
