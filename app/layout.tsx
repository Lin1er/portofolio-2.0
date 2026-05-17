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
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  verification: {
    google: "jJHGCMuoy94jnBqTSb921m99iNlXYSH5YDjl1YJnpxI",
  },
  manifest: "/manifest.webmanifest",
};

// JSON-LD Structured Data (@graph: Person + WebSite + ProfilePage)
const personId = `${siteConfig.url}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: personalInfo.name,
      url: siteConfig.url,
      image: `${siteConfig.url}/assets/hero.png`,
      sameAs: [
        "https://github.com/Lin1er",
        "https://linkedin.com/in/ulinuha",
        "https://instagram.com/ulinuha.a_",
      ],
      jobTitle: personalInfo.role,
      email: `mailto:${personalInfo.email}`,
      telephone: personalInfo.phone,
      nationality: "Indonesian",
      knowsLanguage: ["en", "id"],
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
        "IoT",
        "Machine Learning",
      ],
      description: personalInfo.bio,
      address: {
        "@type": "PostalAddress",
        addressLocality: "East Lampung",
        addressRegion: "Lampung",
        addressCountry: "ID",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: `${siteConfig.name} Portfolio`,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": personId },
      author: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      mainEntity: { "@id": personId },
      about: { "@id": personId },
      inLanguage: "en",
    },
  ],
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
