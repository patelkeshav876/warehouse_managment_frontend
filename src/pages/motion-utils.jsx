// src/motion-utils.jsx
import React from "react";
import { motion } from "framer-motion";

/* Warm palette CSS variables (also available via warm-palette.css) */
export const warmPaletteCSS = `
:root{
  --warm-50:  #fff8f2;
  --warm-100: #ffefe1;
  --warm-200: #ffd9c2;
  --warm-300: #ffc39f;
  --warm-400: #ffad78;
  --warm-500: #ff9360;
  --warm-600: #ff7b40;
  --warm-700: #e05b2e;
  --warm-800: #b94824;
  --warm-900: #8a321b;

  --soft-ink:  #1f2937;
  --muted-700: #334155;
  --muted-500: #6b7280;
}
`;

/* inject palette for projects without a global CSS import */
export function injectWarmPalette() {
  if (typeof document === "undefined") return;
  if (document.getElementById("warm-palette-css")) return;
  const s = document.createElement("style");
  s.id = "warm-palette-css";
  s.innerHTML = warmPaletteCSS;
  document.head.appendChild(s);
}

/* motion presets */
const fadeUp = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { initial: {}, animate: { transition: { staggerChildren: 0.12 } } };
const floaty = { animate: { y: [0, -10, 0], x: [0, 6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } } };

/* wrappers */
export const MotionDiv = ({ children, className = "", ...rest }) => (
  <motion.div {...fadeUp} className={className} initial="initial" animate="animate" {...rest}>{children}</motion.div>
);

export const Stagger = ({ children, className = "", ...rest }) => (
  <motion.div variants={stagger} initial="initial" animate="animate" className={className} {...rest}>{children}</motion.div>
);

export const FloatBlob = ({ className = "", style = {}, ...rest }) => (
  <motion.div className={className} style={style} variants={floaty} animate="animate" aria-hidden {...rest} />
);

export const AnimatedButton = ({ children, className = "", whileHoverScale = 1.03, ...rest }) => (
  <motion.button whileHover={{ scale: whileHoverScale }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={className} {...rest}>
    {children}
  </motion.button>
);
