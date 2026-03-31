import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Preloader } from "@/components/ui/preloader";
// import { DevBanner } from "@/components/ui/dev-banner";
import { siteConfig, personalInfo } from "@/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/assets/hero.png`,
  sameAs: [
    "https://github.com/Lin1er",
    "https://linkedin.com/in/ulinuha",
    "https://instagram.com/ulinuha.a_",
  ],
  jobTitle: personalInfo.role,
  worksFor: {
    "@type": "Organization",
    name: personalInfo.university,
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: personalInfo.university,
  },
  knowsAbout: [
    "Full-Stack Development",
    "Web3",
    "Blockchain",
    "React",
    "Next.js",
    "Laravel",
    "Node.js",
    "TypeScript",
    "SUI Move",
  ],
  description: personalInfo.bio,
  email: personalInfo.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "East Lampung",
    addressCountry: "Indonesia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* <DevBanner /> */}
          <Preloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
