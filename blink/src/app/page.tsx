'use client';

import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { TypeSelection } from "@/components/TypeSelection";
import { DonateForm } from "@/components/DonateForm";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);


  const handleWalletConnect = () => {
    setIsWalletConnected(true); // Wallet connected, update state 
  };

  return (
    <main className="flex items-center justify-center h-screen">
        {/* <TypeSelection /> */}
        <DonateForm />
    </main>
  );
}

