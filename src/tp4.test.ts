import { describe, it, expect } from "vitest";
import { Color, Reponse, wordleLine } from "./tp4";

describe("Line validation", () => {
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

  it("Different case (proposition in uppercase)", () => {
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

  it("Different case (mysteryWord in uppercase)", () => {
    const result = wordleLine("ethos", "ETHOS");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Invalid proposition length", () => {
    const execution = () => wordleLine("ATHOS", "");
    expect(execution).toThrow();
  });

  it("Invalid mystery word length", () => {
    const execution = () => wordleLine("ATOS", "ATHOS");
    expect(execution).toThrow();
  });

  it("Invalid with 1 existing letter", () => {
    const result = wordleLine("APPLE", "LIGHT");
    const expected: Reponse = [
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });
});
