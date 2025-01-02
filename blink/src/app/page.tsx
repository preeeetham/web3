'use client'; // Ensure this is at the top for client-side rendering

import {LandingPage} from "@/components/LandingPage";

const handleClick = () => {
  window.open("https://github.com/preeetham/web3", "_blank");
};

export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <LandingPage />
      </main>
    </>
  );
}

