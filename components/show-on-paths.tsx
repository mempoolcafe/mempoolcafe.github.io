"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ShowOnPathsProps {
  /** Section roots, e.g. "/blog" also covers "/blog/<slug>". */
  paths: string[];
  children: ReactNode;
}

// Lets the shared layout show a block (like the sidebar's Donate box) on only
// some sections of the site.
export default function ShowOnPaths({ paths, children }: ShowOnPathsProps) {
  const pathname = usePathname();
  const show = paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  return show ? children : null;
}
