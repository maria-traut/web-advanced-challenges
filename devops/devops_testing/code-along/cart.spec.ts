import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./cart";

describe("calculateDiscount", () => {
  it("applies a standard 10% discount correctly", () => {
    const result = calculateDiscount(100, 10);
    expect(result).toBe(90);
  });

  it("handles a 0% discount by returning the original price", () => {
    const result = calculateDiscount(50, 0);
    expect(result).toBe(50);
  });

  it("throws an error when provided a negative price", () => {
    expect(() => calculateDiscount(-10, 20)).toThrow(
      "Values cannot be negative",
    );
  });
});
