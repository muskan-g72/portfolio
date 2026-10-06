import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          color: "#ece9e1",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, opacity: 0.6 }}>
          SOFTWARE ENGINEER · THAPAR · 2026
        </div>
        <div style={{ fontSize: 92, letterSpacing: -4 }}>MUSKAN</div>
        <div style={{ fontSize: 28, opacity: 0.8, maxWidth: 800 }}>
          I build software that holds up under load.
        </div>
      </div>
    ),
    { ...size },
  );
}
