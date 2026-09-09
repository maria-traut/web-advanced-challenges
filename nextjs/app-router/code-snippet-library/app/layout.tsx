import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <style>{`
          body {
            font-family: var(--font-inter);
          }
          h1, h2, h3 {
            font-family: var(--font-inter);
            font-weight: 700;
          }
          pre, code {
            font-family: var(--font-jetbrains-mono);
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
