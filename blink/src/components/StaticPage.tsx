'use client'

import { Background } from "./Background";

const handleClick = () => {
  window.open("https://github.com/preeetham/web3", "_blank");
};

export function StaticPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      {/* Header: Title */}
      <div className="absolute top-5 left-10">
        <h1 className="text-black font-sans font-bold text-2xl">Blinker.</h1>
      </div>

      {/* Header: Source Code Button */}
      <div className="absolute top-5 right-10">
        <button
          className="px-4 py-2 text-sm font-medium text-white border bg-black border-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleClick}
          aria-label="Open source code on GitHub"
        >
          Source Code
        </button>
      </div>

      {/* Main Content */}
      <div className="flex px-10 relative">
        <Background />
        {/* Additional elements can be added here */}
      </div>
    </main>
  );
}
