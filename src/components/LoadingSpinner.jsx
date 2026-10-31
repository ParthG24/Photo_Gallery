import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-8 h-8 border-2 border-[#dbe2d4] border-t-[#445e39] rounded-full animate-spin" />
      <p className="mt-4 text-xs uppercase tracking-widest text-[#64705c] font-medium">
        Loading 30 Photos...
      </p>
    </div>
  );
}
