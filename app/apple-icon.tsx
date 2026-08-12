import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK_PATH =
  "m870.67,7.78H7.5v299.6h761.99v32.54H7.5v458.55h359.42v-152.87h503.75c113.41,0,205.34-79.53,205.34-177.63V185.41c0-98.1-91.93-177.63-205.34-177.63Z";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#100f0d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="116"
          height="86"
          viewBox="0 0 1083.51 806.05"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={MARK_PATH} fill="#f4f1ea" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
