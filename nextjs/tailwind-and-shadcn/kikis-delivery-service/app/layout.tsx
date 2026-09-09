import "./globals.css";
import { Cherry_Bomb_One, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb-one",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={cherryBomb.variable}>
        <header>
          <h1 style={{ fontFamily: cherryBomb.style.fontFamily }}>
            Kiki's Delivery Service
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
