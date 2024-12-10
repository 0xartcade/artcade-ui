'use client';

export default function MobilePanel() {
  return (
    <div className="h-full flex items-center justify-start p-4">
      {/* iPhone Frame */}
      <div className="relative h-[95%] aspect-[1/2] bg-zinc-800 rounded-[45px] p-4 shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
        
        {/* Inner Screen */}
        <div className="h-full w-full bg-zinc-950 rounded-[35px] overflow-hidden">
          {/* Future content will go here */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-zinc-600 text-sm">Mobile Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
} 