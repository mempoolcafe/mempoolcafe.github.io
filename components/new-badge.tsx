"use client";

import { useEffect, useState } from "react";

const NEW_FOR_DAYS = 30;

// Checked in the browser after mount so the tag expires on its own instead of
// being frozen at build time (and so server/client markup always match).
export default function NewBadge({ date }: { date: string }) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const ageMs = Date.now() - new Date(`${date}T00:00:00`).getTime();
    setIsNew(ageMs >= 0 && ageMs < NEW_FOR_DAYS * 24 * 60 * 60 * 1000);
  }, [date]);

  if (!isNew) {
    return null;
  }
  return (
    <span className="blink ml-1 align-middle text-[10px] font-bold text-[#ff0000]">
      NEW!
    </span>
  );
}
