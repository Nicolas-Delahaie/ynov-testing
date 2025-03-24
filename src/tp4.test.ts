import { describe, it, expect } from "vitest";
import { Color, Reponse, wordleLine } from "./tp4";

describe("BowlingConversion", () => {
  it("Perfect line", () => {
    const result = wordleLine("ETHOS", "ETHOS");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Partially corect line", () => {
    const result = wordleLine("ETHOS", "ETHAL");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("No matching letter", () => {
    const result = wordleLine("ETHOS", "VWXYZ");
    const expected: Reponse = [
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("Uppercase", () => {
    const result = wordleLine("ETHOS", "ethos");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Invalid length", () => {
    const execution = () => wordleLine("ATHOS", "");
    expect(execution).toThrow();
  });
});
