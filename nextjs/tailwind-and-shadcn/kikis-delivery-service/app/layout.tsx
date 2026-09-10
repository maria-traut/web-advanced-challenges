import "./globals.css";
import { Cherry_Bomb_One, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", figtree.variable)}
    >
      <body className={cherryBomb.variable}>
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <h1 style={{ fontFamily: cherryBomb.style.fontFamily }}>
                Kiki's Delivery Service
              </h1>
              <NavBar />
            </header>
            <main>{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
