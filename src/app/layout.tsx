import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteNav, SiteFooter } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/chrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Editorial serif for display headings, warm, human, a little wonky.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jp-ai-portfolio-phi.vercel.app"),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s, ${site.name}`,
  },
  description: site.positioning,
  keywords: [
    "Jyothiprakash S",
    "JP AI Product Engineer",
    "AI Engineer portfolio",
    "AI Product Manager portfolio",
    "RAG",
    "LLM evals",
    "AI agents",
  ],
  openGraph: {
    title: `${site.name}, ${site.role}`,
    description: site.positioning,
    type: "website",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.role}`,
    description: site.positioning,
    images: ["/og.png"],
  },
};

// Before first paint: apply saved theme (no flash) and arm scroll-reveal.
// `reveal-ready` gates the hidden start-state, so no-JS loads and crawlers
// always see the content (see .reveal in globals.css).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}document.documentElement.classList.add('reveal-ready');})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll />
        <ScrollProgress />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
