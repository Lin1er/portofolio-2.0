import { ImageResponse } from "next/og";
import { siteConfig, personalInfo } from "@/data";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, #1e1b4b 0%, #0a0a0a 55%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a5b4fc",
            letterSpacing: 4,
          }}
        >
          PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 24,
          }}
        >
          {personalInfo.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            marginTop: 20,
            color: "#6366f1",
          }}
        >
          {personalInfo.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 28,
            color: "#cbd5e1",
          }}
        >
          {personalInfo.location} · {personalInfo.university}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 56,
            color: "#818cf8",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
