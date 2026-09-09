import "./globals.css";
import { Cherry_Bomb_One } from "next/font/google";

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
    <html lang="en">
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
