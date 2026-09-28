import { describe, expect, it } from "vitest";
import { formatSentAt } from "./formatSentAt";

describe("formatSentAt", () => {
  it("returns just the time when the timestamp falls on the same day as now", () => {
    const now = Date.UTC(2026, 8, 28, 18, 0, 0);
    const timestamp = Date.UTC(2026, 8, 28, 14, 32, 0);

    expect(formatSentAt(timestamp, now)).toBe("2:32 PM");
  });

  it("prefixes with 'Yesterday' when the timestamp falls on the day before now", () => {
    const now = Date.UTC(2026, 8, 28, 20, 0, 0);
    const timestamp = Date.UTC(2026, 8, 27, 14, 32, 0);

    expect(formatSentAt(timestamp, now)).toBe("Yesterday, 2:32 PM");
  });

  it("includes the month and day, without a year, when earlier in the same year", () => {
    const now = Date.UTC(2026, 9, 15, 12, 0, 0);
    const timestamp = Date.UTC(2026, 8, 24, 14, 32, 0);

    expect(formatSentAt(timestamp, now)).toBe("Sep 24, 2:32 PM");
  });

  it("includes the year when the timestamp falls in a different year than now", () => {
    const now = Date.UTC(2026, 8, 28, 12, 0, 0);
    const timestamp = Date.UTC(2025, 8, 24, 14, 32, 0);

    expect(formatSentAt(timestamp, now)).toBe("Sep 24, 2025, 2:32 PM");
  });

  describe("midnight boundary", () => {
    it("treats a timestamp just before midnight as 'yesterday' relative to a now just after midnight", () => {
      const now = Date.UTC(2026, 8, 28, 0, 0, 1);
      const timestamp = Date.UTC(2026, 8, 27, 23, 59, 0);

      expect(formatSentAt(timestamp, now)).toBe("Yesterday, 11:59 PM");
    });

    it("treats a timestamp at midnight as 'today' relative to a now later the same day", () => {
      const now = Date.UTC(2026, 8, 28, 23, 59, 0);
      const timestamp = Date.UTC(2026, 8, 28, 0, 0, 0);

      expect(formatSentAt(timestamp, now)).toBe("12:00 AM");
    });
  });

  describe("new year boundary", () => {
    it("uses 'Yesterday' across a year boundary rather than showing the year", () => {
      const now = Date.UTC(2026, 0, 1, 0, 30, 0);
      const timestamp = Date.UTC(2025, 11, 31, 23, 45, 0);

      expect(formatSentAt(timestamp, now)).toBe("Yesterday, 11:45 PM");
    });

    it("shows month, day and year for a previous-year timestamp that isn't yesterday", () => {
      const now = Date.UTC(2026, 0, 15, 12, 0, 0);
      const timestamp = Date.UTC(2025, 11, 31, 23, 45, 0);

      expect(formatSentAt(timestamp, now)).toBe("Dec 31, 2025, 11:45 PM");
    });
  });

  it("formats relative to the provided IANA time zone instead of UTC", () => {
    // 2026-09-28T04:32:00Z is 2026-09-28T00:32 in America/New_York (EDT, UTC-4)
    const timestamp = Date.UTC(2026, 8, 28, 4, 32, 0);
    // 2026-09-28T15:00:00Z is 2026-09-28T11:00 in America/New_York, same local day
    const now = Date.UTC(2026, 8, 28, 15, 0, 0);

    expect(formatSentAt(timestamp, now, "America/New_York")).toBe("12:32 AM");
  });

  it("treats the timestamp as 'yesterday' when the local day differs from the UTC day", () => {
    // 2026-09-28T02:00:00Z is 2026-09-27T22:00 in America/New_York (EDT, UTC-4)
    const timestamp = Date.UTC(2026, 8, 28, 2, 0, 0);
    // 2026-09-28T15:00:00Z is 2026-09-28T11:00 in America/New_York
    const now = Date.UTC(2026, 8, 28, 15, 0, 0);

    expect(formatSentAt(timestamp, now, "America/New_York")).toBe(
      "Yesterday, 10:00 PM",
    );
  });

  it("formats noon as '12:00 PM'", () => {
    const now = Date.UTC(2026, 8, 28, 18, 0, 0);
    const timestamp = Date.UTC(2026, 8, 28, 12, 0, 0);

    expect(formatSentAt(timestamp, now)).toBe("12:00 PM");
  });

  it("treats a timestamp later the same day than now as 'today' and shows just the time", () => {
    const now = Date.UTC(2026, 8, 28, 14, 0, 0);
    const timestamp = Date.UTC(2026, 8, 28, 18, 0, 0);

    expect(formatSentAt(timestamp, now)).toBe("6:00 PM");
  });

  it("treats a timestamp on a later day than now as 'today' and shows just the time", () => {
    const now = Date.UTC(2026, 8, 28, 14, 0, 0);
    const timestamp = Date.UTC(2026, 8, 29, 9, 0, 0);

    expect(formatSentAt(timestamp, now)).toBe("9:00 AM");
  });

  describe("invalid input", () => {
    const now = Date.UTC(2026, 8, 28, 18, 0, 0);
    const timestamp = Date.UTC(2026, 8, 28, 14, 32, 0);

    it("throws a descriptive error when timestamp is NaN", () => {
      expect(() => formatSentAt(NaN, now)).toThrow(/timestamp/i);
    });

    it("throws a descriptive error when timestamp is Infinity", () => {
      expect(() => formatSentAt(Infinity, now)).toThrow(/timestamp/i);
    });

    it("throws a descriptive error when timestamp is -Infinity", () => {
      expect(() => formatSentAt(-Infinity, now)).toThrow(/timestamp/i);
    });

    it("throws a descriptive error when timestamp is not a number", () => {
      expect(() =>
        formatSentAt("2026-09-28T14:32:00Z" as unknown as number, now),
      ).toThrow(/timestamp/i);
    });

    it("throws a descriptive error when now is NaN", () => {
      expect(() => formatSentAt(timestamp, NaN)).toThrow(/now/i);
    });

    it("throws a descriptive error when now is Infinity", () => {
      expect(() => formatSentAt(timestamp, Infinity)).toThrow(/now/i);
    });

    it("throws a descriptive error when now is not a number", () => {
      expect(() =>
        formatSentAt(timestamp, "2026-09-28T18:00:00Z" as unknown as number),
      ).toThrow(/now/i);
    });
  });
});
