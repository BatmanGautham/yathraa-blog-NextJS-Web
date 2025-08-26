import React from "react";

const Gallery: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-stretch">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Top card with button */}
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] group">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800"
              alt="Comfort Zone"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-start p-6 text-white [text-shadow:0.3rem_0.4rem_0.8rem_rgba(0,0,0,0.56)]">
              <h3 className="text-lg font-semibold mb-3">
                Explore more to get your comfort zone
              </h3>
              <button className="relative z-10 mt-[-0.2rem] px-5 py-2.5 bg-white text-black font-semibold text-sm rounded-lg cursor-pointer shadow-[ -0.3rem_0.4rem_0.8rem_0.2rem_rgba(0,0,0,0.5)] transition-colors hover:bg-black hover:text-white">
                Book Now →
              </button>
            </div>
          </div>

          {/* Bottom card with number */}
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] group">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
              alt="Article Available"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-start p-6 text-white [text-shadow:0.3rem_0.4rem_0.8rem_rgba(0,0,0,0.56)]">
              <p className="text-base">Article Available</p>
              <h2 className="text-3xl font-bold">78</h2>
            </div>
          </div>
        </div>

        {/* Right column (big image) */}
        <div className="relative overflow-hidden rounded-xl aspect-[16/9] group">
          <img
            src="http://images.pexels.com/photos/4215112/pexels-photo-4215112.jpeg?_gl=1*wmf3q*_ga*MTAyMzk2MTE2OS4xNjg3MDc5MzUx*_ga_8JE65Q40S6*czE3NTU4ODE3MDEkbzI0JGcxJHQxNzU1ODgzMzcyJGoxMCRsMCRoMA.."
            alt="Memories"
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white [text-shadow:0.3rem_0.4rem_0.8rem_rgba(0,0,0,0.62)] px-6">
            <h2 className="max-w-[80%] text-xl sm:text-2xl font-bold leading-snug">
              Beyond accommodation, creating memories of a lifetime
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
