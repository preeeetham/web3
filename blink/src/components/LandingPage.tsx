'use client'

import { StaticPage } from "./StaticPage";
import { WalletButton } from "./WalletButton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";


export function LandingPage() {
  return (
    <>
        <div className="flex px-10 relative">
          <StaticPage />
          {/* Form Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="justify-center">
                <h1 className="text-2xl font-bold">Let's get Started</h1>
                <p className="text-sm text-muted-foreground">
                  Connet your wallet..
                </p>
              </CardHeader>
              <CardFooter className="flex flex-col gap-4">
                <WalletButton />
              </CardFooter>
            </Card>
          </div>
        </div>
    </>
  )

}