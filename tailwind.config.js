/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C0E",
        panel: "#131417",
        panelBorder: "#232529",
        amberX: "#F5A524",
        roseX: "#F5484D",
        emeraldX: "#34D399",
      },
      fontFamily: {
        case: ["'Space Mono'", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,165,36,0.15), 0 12px 40px -12px rgba(245,165,36,0.25)",
        glowRose: "0 0 0 1px rgba(245,72,77,0.15), 0 12px 40px -12px rgba(245,72,77,0.25)",
        panel: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        stampIn: {
          "0%": { opacity: 0, transform: "scale(1.6) rotate(-14deg)" },
          "60%": { opacity: 1, transform: "scale(0.94) rotate(-6deg)" },
          "100%": { opacity: 1, transform: "scale(1) rotate(-6deg)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        stampIn: "stampIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        fadeUp: "fadeUp 0.6s ease both",
        pulseSlow: "pulseSlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
