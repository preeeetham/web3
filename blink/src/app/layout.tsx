import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: "#72d4f6" }}>
                {children}
            </body>
        </html>
    );
}
