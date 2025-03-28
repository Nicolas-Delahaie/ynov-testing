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

  it("Partial match line", () => {
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

  it("Throws if proposition is other than letters", () => {
    const containsNumber = () => wordleLine("MANGE", "1AAAA");
    const containsSpecialChar = () => wordleLine("MANGE", "!AAAA");
    expect(containsNumber).toThrow();
    expect(containsSpecialChar).toThrow();
  });

  it("Case-insensitive matching", () => {
    const result1 = wordleLine("ETHOS", "ethos");
    const result2 = wordleLine("ethos", "ETHOS");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.green,
    ];
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("Throws if proposition length is not 5", () => {
    const execution = () => wordleLine("ATHOS", "");
    expect(execution).toThrow();
  });

  it("Throws if mystery word length is not 5", () => {
    const execution = () => wordleLine("ATOS", "ATHOS");
    expect(execution).toThrow();
  });

  it("One letter in common", () => {
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

  it("Multiple letters in common", () => {
    const result = wordleLine("PATES", "APPLE");
    const expected: Reponse = [
      Color.yellow,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.yellow,
    ];
    expect(result).toEqual(expected);
  });

  it("One partial match plus one correct at the end", () => {
    const result = wordleLine("PZZZP", "TPTTP");
    const expected: Reponse = [
      Color.grey,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("One partial match at first index plus one correct at last index", () => {
    const result = wordleLine("ZZZPP", "PPTTP");
    const expected: Reponse = [
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Four letters correct, last letter mismatch", () => {
    const result = wordleLine("APPLE", "APPLY");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("One letter mismatch in the middle", () => {
    const result = wordleLine("GRAPE", "GRACE");
    const expected: Reponse = [
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Multiple partial matches (GRAPE vs PEARL)", () => {
    const result = wordleLine("GRAPE", "PEARL");
    const expected: Reponse = [
      Color.yellow,
      Color.yellow,
      Color.green,
      Color.yellow,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("Handles repeated letters (ALLEE vs ELITE)", () => {
    const result = wordleLine("ALLEE", "ELITE");
    const expected: Reponse = [
      Color.yellow,
      Color.green,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("One correct plus partial repeated letter (PIANO vs PAPAS)", () => {
    const result = wordleLine("PIANO", "PAPAS");
    const expected: Reponse = [
      Color.green,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });
});
