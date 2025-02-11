import { describe, it, expect } from "vitest";
import { Frame, rollsToFrame } from "./tp2";

describe("BowlingConversion", () => {
  it("Strike and spare are recognized", () => {
    const result = rollsToFrame([10, 5, 5, 3, 4], 3);
    const expectedFrames: Frame[] = ["X", "/", 7];
    expect(result.frames).toStrictEqual(expectedFrames);
  });

  it("Extras strikes are recognized", () => {
    const result = rollsToFrame([10, 10, 10, 10], 2);
    expect(result.extra).toBe(20);
  });

  it("Extras spares are recognized", () => {
    const result = rollsToFrame([10, 8, 2, 10], 2);
    expect(result.extra).toBe(10);
  });

  //   it("Missing rolls", () => {
  //     expect(() => rollsToFrame([10, 8], 2)).toThrow();
  //   });
});
