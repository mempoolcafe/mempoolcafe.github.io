"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export default function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      // Clipboard can be blocked (insecure context, permissions).
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button type="button" onClick={copy} className="btn-classic">
      {state === "copied"
        ? "Copied!"
        : state === "failed"
          ? "Copy failed — select it above"
          : label}
    </button>
  );
}
