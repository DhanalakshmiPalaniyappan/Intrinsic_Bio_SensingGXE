/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bio: {
          bg: "#07110D",
          bg2: "#0A1611",
          card: "#0D1C16",
          elevated: "#11251C",
          border: "#19382B",
          text: "#E8F5EE",
          muted: "#8FA99D",
          faint: "#61766B",
          accent: "#27E6B0",
          warning: "#F5B942",
          critical: "#EF6262",
          info: "#4DA3FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(39,230,176,0.25)",
        "glow-sm": "0 0 12px rgba(39,230,176,0.18)",
        card: "0 1px 0 rgba(255,255,255,0.02) inset",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: 0.55, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.15)" },
        },
        pulseLine: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-400" },
        },
        travel: {
          "0%": { offsetDistance: "0%", opacity: 0 },
          "8%": { opacity: 1 },
          "92%": { opacity: 1 },
          "100%": { offsetDistance: "100%", opacity: 0 },
        },
        risePulse: {
          "0%": { transform: "translateY(0)", opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { transform: "translateY(-140px)", opacity: 0 },
        },
        floatParticle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        ringGrow: {
          "0%": { strokeDashoffset: "var(--ring-circumference)" },
          "100%": { strokeDashoffset: "var(--ring-offset)" },
        },
      },
      animation: {
        breathe: "breathe 2.4s ease-in-out infinite",
        pulseLine: "pulseLine 6s linear infinite",
        risePulse: "risePulse 3.2s ease-in-out infinite",
        floatParticle: "floatParticle 4s ease-in-out infinite",
        fadeSlideUp: "fadeSlideUp 0.6s ease-out forwards",
        ringGrow: "ringGrow 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
