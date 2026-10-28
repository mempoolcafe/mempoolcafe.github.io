// Date helpers for blog posts. Kept separate from blog.ts (which reads the
// filesystem) so client components can use them too.

function toUtcDate(isoDate: string): Date | null {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(Date.UTC(year, month - 1, day));
}

/** "2026-10-28" -> "Oct 28, 2026", without timezone drift. */
export function formatPostDate(isoDate: string): string {
  const date = toUtcDate(isoDate);
  if (!date) {
    return isoDate;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "2026-10-28" -> "October 2026". */
export function formatPostMonth(isoDate: string): string {
  const date = toUtcDate(isoDate);
  if (!date) {
    return isoDate;
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
