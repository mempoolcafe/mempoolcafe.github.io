"use client";

import { useEffect } from "react";

const COLORS = ["#ff4fd8", "#ffd700", "#4fc3ff", "#7cff4f", "#ff7b4f", "#b44fff"];
const GLYPHS = ["✦", "✧", "★", "✶"];
const THROTTLE_MS = 40;
const MAX_LIVE = 25;

// Retro mouse trail: small sparkles that drift down and fade. Plain DOM nodes
// (not React state) so mousemove never triggers re-renders.
export default function SparkleTrail() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduceMotion.matches || !finePointer.matches) {
      return;
    }

    let last = 0;
    let live = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < THROTTLE_MS || live >= MAX_LIVE) {
        return;
      }
      last = now;

      const el = document.createElement("span");
      el.className = "sparkle";
      el.setAttribute("aria-hidden", "true");
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.setProperty("--drift-x", `${Math.round(Math.random() * 30 - 15)}px`);
      el.addEventListener("animationend", () => {
        el.remove();
        live -= 1;
      });
      document.body.appendChild(el);
      live += 1;
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll(".sparkle").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
