'use client'; // Ensure this is at the top for client-side rendering

import { Button } from "@/components/ui/button";
import { Background } from "../components/background";
import { Card, CardHeader,  CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import  { WalletButton} from "../components/walletButton";

const handleClick = () => {
  window.open("https://github.com/preeetham/web3", "_blank");
};

export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="absolute top-5 left-10">
          <h1 className="text-black font-sans font-bold text-2xl">Blinker.</h1>
        </div>
        <div>
          <WalletButton />
        </div>
        <div className="absolute top-5 right-10">
          <button
            className="px-4 py-2 text-sm font-medium text-white border bg-black border-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleClick}
            aria-label="Open source code on GitHub"
          >
            Source Code
          </button>
        </div>
        <div className="flex px-10 relative">
          <Background />
          {/* Form Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-sm text-muted-foreground">
                  Sign up to get started
                </p>
              </CardHeader>
              <Card>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-4"
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="mb-4"
                />
              </Card>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full bg-black text-white rounded-md hover:bg-gray-800"
                  onClick={() => alert("Submitted!")}
                >
                  Submit
                </Button>
                {/* <WalletButton /> */}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

