function assertFiniteNumber(value: number, name: string): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(
      `formatSentAt: ${name} must be a finite number, received ${String(value)}`,
    );
  }
}

function getDateParts(
  millisecondsSinceEpoch: number,
  timeZone: string,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(millisecondsSinceEpoch);

  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
  };
}

function getTimeText(millisecondsSinceEpoch: number, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(millisecondsSinceEpoch);

  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${lookup.hour}:${lookup.minute} ${lookup.dayPeriod}`;
}

function getMonthDayText(millisecondsSinceEpoch: number, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
  }).formatToParts(millisecondsSinceEpoch);

  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${lookup.month} ${lookup.day}`;
}

export function formatSentAt(
  timestamp: number,
  now: number,
  timeZone = "UTC",
): string {
  assertFiniteNumber(timestamp, "timestamp");
  assertFiniteNumber(now, "now");

  const timestampDateParts = getDateParts(timestamp, timeZone);
  const nowDateParts = getDateParts(now, timeZone);

  const timestampDayIndex = Date.UTC(
    timestampDateParts.year,
    timestampDateParts.month - 1,
    timestampDateParts.day,
  );
  const nowDayIndex = Date.UTC(
    nowDateParts.year,
    nowDateParts.month - 1,
    nowDateParts.day,
  );
  const dayDifference = Math.round((nowDayIndex - timestampDayIndex) / 86_400_000);

  const timeText = getTimeText(timestamp, timeZone);

  if (dayDifference <= 0) {
    return timeText;
  }

  if (dayDifference === 1) {
    return `Yesterday, ${timeText}`;
  }

  const monthDayText = getMonthDayText(timestamp, timeZone);

  if (timestampDateParts.year === nowDateParts.year) {
    return `${monthDayText}, ${timeText}`;
  }

  return `${monthDayText}, ${timestampDateParts.year}, ${timeText}`;
}
