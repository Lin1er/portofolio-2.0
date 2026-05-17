import { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} - Portfolio`,
    short_name: "Ulinuha",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: siteConfig.theme.accentColor,
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
