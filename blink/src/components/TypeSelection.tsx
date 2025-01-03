'use client'
import { StaticPage } from "./StaticPage";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { IoArrowBackCircle } from "react-icons/io5";

export function TypeSelection() {
    return (
        <>
            <div className="flex px-10 relative">
                <StaticPage />
                {/* Form Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Card className="w-96 flex flex-col items-center p-2 space-y-6">
                        {/* Back Button and Header */}
                        <div className="flex items-center w-full justify-evenly">
                            <IoArrowBackCircle className="text-3xl cursor-pointer" />
                            <CardHeader className="flex flex-1 justify-center">
                                <h1 className="text-2xl font-bold">Select</h1>
                            </CardHeader>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-4 w-full max-w-sm">
                            <Button className="w-full rounded-lg text-white hover:bg-gray-800 transition-all duration-300">
                                Donation
                            </Button>
                            <Button className="w-full rounded-lg text-white hover:bg-gray-800 transition-all duration-300">
                                Gen with A/I
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
