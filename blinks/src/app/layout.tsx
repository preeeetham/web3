import React from "react";
import "./globals.css"; // Import global styles

export const metadata = {
  title: "My Next.js App",
  description: "A basic layout for a Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">My Next.js App</h1>
          </div>
        </header>
        <main className="container mx-auto py-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
