import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");

const rem = (px) => `${round(px / 16)}rem`;

export const theme = {
  colors: {
    // Modern Dark Theme
    background: "#0b0f19",
    container: "#131822",
    containerHover: "#1c2333",
    surface: "#151b28",
    surfaceHover: "#1c2538",

    border: "#2a3347",
    borderLight: "#364153",

    text: "#e4e9f2",
    textMuted: "#8892a8",
    heading: "#f0f4ff",

    white: "#ffffff",
    black: "#070a12",

    primary: "#6d9eff",
    primaryHover: "#89b0ff",
    success: "#4ade80",
    warning: "#fbbf24",
    danger: "#fb7185",

    // Brand accent
    accent: "#c084fc",
    accentHover: "#d8b4fe",

    // Extended gray scale
    gray50: "#f8f9fc",
    gray100: "#e4e9f2",
    gray200: "#c8d0e0",
    gray300: "#a8b4cc",
    gray400: "#8892a8",
    gray500: "#6a748a",
    gray600: "#4a5468",
    gray700: "#364052",
    gray800: "#222b3d",
    gray900: "#151b28",
  },

  fontFamily: {
    heading: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Noto Sans",
      "sans-serif",
    ].join(","),

    sans: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Noto Sans",
      "sans-serif",
    ].join(","),

    mono: [
      "JetBrains Mono",
      "SFMono-Regular",
      "Consolas",
      "Liberation Mono",
      "Menlo",
      "monospace",
    ].join(","),
  },

  // GitHub font-size scale (base: 14px)
  // https://primer.style/design/foundations/typography
  fontSize: {
    "6xl": rem(48), // 48px
    "5xl": rem(40), // 40px
    "4xl": rem(32), // 32px — h1
    "3xl": rem(28), // 28px
    "2xl": rem(24), // 24px — h2
    xl: rem(20), // 20px — h3
    lg: rem(18), // 18px
    md: rem(16), // 16px — h4, body large
    sm: rem(14), // 14px — body, h5
    xs: rem(12), // 12px — h6, small text
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    xxl: rem(48),
    "3xl": rem(64),
  },

  borderRadius: {
    sm: rem(4),
    md: rem(6),
    lg: rem(8),
    xl: rem(12),
    full: "9999px",
  },

  breakpoints: {
    sm: "544px",
    md: "768px",
    lg: "1012px",
    xl: "1280px",
  },

  // Layout
  layout: {
    maxWidth: "1280px",
    sidebarWidth: "296px",
    contentPadding: rem(24),
  },
};

export function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
