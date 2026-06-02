"use client";

import { useState, useEffect } from "react";

export default function ProductImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden z-10 p-8">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Product view ${index + 1}`}
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>
      ))}
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-500 w-6" : "bg-slate-500/50 w-2 hover:bg-slate-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
