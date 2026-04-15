import { ImageResponse } from "next/og";

export const alt = "Agent IA sur-mesure — Ergonomia | Julien Talbot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "#f5f4ed",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60px",
            height: "3px",
            background: "#c96442",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c96442",
            marginBottom: "24px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Agent IA sur-mesure
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "#262420",
          }}
        >
          Votre agent IA dort
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "#706e64",
            marginBottom: "32px",
          }}
        >
          dans un coin.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#706e64",
            marginBottom: "48px",
          }}
        >
          Un ergonome le configure. Il agit.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              background: "#c96442",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#262420",
            }}
          >
            Julien Talbot — Ergonomia — La Réunion
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}