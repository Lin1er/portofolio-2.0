import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 320,
          fontWeight: 800,
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #6366f1 0%, #312e81 100%)",
          fontFamily: "sans-serif",
        }}
      >
        U
      </div>
    ),
    { ...size }
  );
}
