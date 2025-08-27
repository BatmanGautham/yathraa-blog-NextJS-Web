// Format a date string into "22 Aug 2025"
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // failsafe for invalid date
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Format read time (minutes) into "X mins" between 2 and 15
export const formatReadTime = (minutes: number): string => {
  if (!minutes || minutes < 1) return "2 mins"; // default lower bound
  const scaled = Math.ceil(minutes / 5); // e.g. 25 → 5
  const clamped = Math.max(2, Math.min(scaled, 15));
  return `${clamped} mins`;
};