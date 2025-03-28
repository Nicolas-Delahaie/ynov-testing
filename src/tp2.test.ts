import { describe, it, expect } from "vitest";
import { getScore } from "./tp2";

describe("BowlingConversion", () => {
  it("Perfect game", () => {
    const result = getScore(
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      10
    );
    expect(result).toBe(300);
  });

  it("Badest game", () => {
    const result = getScore([0, 0, 0, 0, 0, 0], 3);
    expect(result).toBe(0);
  });

  it("Game without spare nor strike", () => {
    const result = getScore([4, 4, 4, 4, 4, 4], 3);
    expect(result).toBe(24);
  });

  it("Game with spare", () => {
    const result = getScore([1, 9, 5, 0], 2);
    expect(result).toBe(20);
  });

  it("Game with spare followed by strike", () => {
    const result = getScore([9, 1, 10, 0, 0], 3);
    expect(result).toBe(30);
  });

  it("Strike at last frame", () => {
    const result = getScore([0, 0, 0, 0, 10, 10, 10], 3);
    expect(result).toBe(30);
  });

  it("Game with alternating strikes and spares", () => {
    const result = getScore(
      [10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10],
      10
    );
    expect(result).toBe(200);
  });

  it("All spares", () => {
    const result = getScore(
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      10
    );
    expect(result).toBe(150);
  });

  it("Game with one spare and minimal frames", () => {
    const result = getScore([5, 5, 7], 2);
    expect(result).toBe(24);
  });

  it("Game without spare or strike in 2 frames", () => {
    const result = getScore([3, 4, 5, 2], 2);
    expect(result).toBe(14);
  });

  it("Game with a single strike and minimal frames", () => {
    const result = getScore([10, 3, 4], 2);
    expect(result).toBe(24);
  });

  it("Game with too many rolls (3 on final frame)", () => {
    expect(() => getScore([10, 4, 4, 4], 2)).toThrow();
  });

  it("Game with too many rolls (4 on final frame)", () => {
    expect(() => getScore([10, 5, 5, 5, 5], 2)).toThrow();
  });

  it("Invalid second throw score", () => {
    expect(() => getScore([7, 6, 10, 10, 10], 2)).toThrow();
  });

  // it("Invalid second throw score on last frame (unhandled)", () => {
  //   const result = getScore([5, 10, 5], 1);
  //   expect(result).toBe(20);
  // });

  // it("Invalid third throw score on last frame (unhandled)", () => {
  //   const result = getScore([10, 5, 10], 1);
  //   expect(result).toBe(25);
  // });

  it("Strike on 1st of last frame", () => {
    const result = getScore([10, 5, 5], 1);
    expect(result).toBe(20);
  });

  // normal game (mixed)

  // strikes followed by numbers

  // strike followed by numbers

  // spare followed by numbers

  // 2 consecutive strikes

  // strike at the end followed by strike

  // strike at the end folled by spare
});
