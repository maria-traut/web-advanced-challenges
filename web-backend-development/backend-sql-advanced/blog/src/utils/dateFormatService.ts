export function getFormattedDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
