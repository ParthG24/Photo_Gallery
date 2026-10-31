import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      <p className="mt-4 text-xs uppercase tracking-widest text-zinc-400 font-medium">
        Loading 30 Photos...
      </p>
    </div>
  );
}
