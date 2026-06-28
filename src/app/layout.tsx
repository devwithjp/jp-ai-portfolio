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
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} — AI Product Manager in Sydney`,
    template: `%s — ${site.name}`,
  },
  description:
    "JP (Jyothiprakash S) is an AI Product Manager and builder in Sydney, Australia. Ex-PM at Rekro, MS in AI at UNSW, ex-engineer to 50M+ users. Builds AI products end to end: RAG, LLM evals, agents, and interpretability.",
  keywords: [
    "AI Product Manager Sydney",
    "AI PM Sydney",
    "AI founder Sydney",
    "AI Product Manager Australia",
    "Jyothiprakash S",
    "AI Engineer portfolio",
    "Technical Product Manager AI",
    "RAG",
    "LLM evals",
    "AI agents",
    "mechanistic interpretability",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: `${site.name} — AI Product Manager in Sydney`,
    description: site.positioning,
    type: "website",
    siteName: site.name,
    locale: "en_AU",
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Product Manager in Sydney`,
    description: site.positioning,
    images: ["/og.png"],
  },
};

// Structured data so search and answer engines (Google, ChatGPT, Perplexity) can
// state plainly who JP is, what he does, and where. This is what gets cited.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jyothiprakash S",
  alternateName: "JP",
  url: site.url,
  jobTitle: "AI Product Manager",
  description:
    "AI Product Manager and builder based in Sydney, Australia. Builds AI products end to end across evaluation, RAG, multimodal, agents, and interpretability.",
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
  homeLocation: { "@type": "Place", name: "Sydney, Australia" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "UNSW Sydney" },
    { "@type": "Organization", name: "Reforge" },
  ],
  worksFor: { "@type": "Organization", name: "Independent / open to roles" },
  knowsAbout: [
    "AI Product Management",
    "Large Language Models",
    "Retrieval-Augmented Generation (RAG)",
    "LLM evaluation",
    "AI agents and tool use",
    "Mechanistic interpretability",
    "Product strategy",
    "Machine learning",
    "Startups",
  ],
  sameAs: [site.links.linkedin, site.links.github],
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — AI Product Manager`,
  url: site.url,
  inLanguage: "en-AU",
  author: { "@type": "Person", name: site.name },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
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
