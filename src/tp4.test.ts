import { describe, it, expect } from "vitest";
import { Color, Wordle } from "./tp4";

describe("Line validation", () => {
  it("Perfect line", () => {
    const game = new Wordle("ETHOS");
    const result = game.guess("ETHOS");
    const expected = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Partial match line", () => {
    const game = new Wordle("ETHOS", false);
    const result = game.guess("ETHAL");
    const expected = [
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("No matching letter", () => {
    const game = new Wordle("ETHOS", false);
    const result = game.guess("VWXYZ");
    const expected = [
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("Throws if proposition is other than letters", () => {
    const containsNumber = () => new Wordle("MANGE", false).guess("1AAAA");
    const containsSpecialChar = () => new Wordle("MANGE").guess("!AAAA");
    expect(containsNumber).toThrow();
    expect(containsSpecialChar).toThrow();
  });

  it("Case-insensitive matching", () => {
    const game1 = new Wordle("ETHOS");
    const result1 = game1.guess("ethos");
    const game2 = new Wordle("ethos");
    const result2 = game2.guess("ETHOS");
    const expected = [
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
    const execution = () => new Wordle("ATHOS").guess("");
    expect(execution).toThrow();
  });

  it("Throws if mystery word length is not 5", () => {
    const execution = () => new Wordle("ATOS", false).guess("ATHOS");
    expect(execution).toThrow();
  });

  it("One letter in common", () => {
    const game = new Wordle("APPLE", false);
    const result = game.guess("LIGHT");
    const expected = [
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("Multiple letters in common", () => {
    const game = new Wordle("PATES", false);
    const result = game.guess("APPLE");
    const expected = [
      Color.yellow,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.yellow,
    ];
    expect(result).toEqual(expected);
  });

  it("One partial match plus one correct at the end", () => {
    const game = new Wordle("PZZZP", false);
    const result = game.guess("TPTTP");
    const expected = [
      Color.grey,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("One partial match at first index plus one correct at last index", () => {
    const game = new Wordle("ZZZPP", false);
    const result = game.guess("PPTTP");
    const expected = [
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Four letters correct, last letter mismatch", () => {
    const game = new Wordle("APPLE", false);
    const result = game.guess("APPLY");
    const expected = [
      Color.green,
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("One letter mismatch in the middle", () => {
    const game = new Wordle("GRAPE", false);
    const result = game.guess("GRACE");
    const expected = [
      Color.green,
      Color.green,
      Color.green,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("Multiple partial matches (GRAPE vs PEARL)", () => {
    const game = new Wordle("GRAPE", false);
    const result = game.guess("PEARL");
    const expected = [
      Color.yellow,
      Color.yellow,
      Color.green,
      Color.yellow,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });

  it("Handles repeated letters (ALLEE vs ELITE)", () => {
    const game = new Wordle("ALLEE");
    const result = game.guess("ELITE");
    const expected = [
      Color.yellow,
      Color.green,
      Color.grey,
      Color.grey,
      Color.green,
    ];
    expect(result).toEqual(expected);
  });

  it("One correct plus partial repeated letter (PIANO vs PAPAS)", () => {
    const game = new Wordle("PIANO", false);
    const result = game.guess("PAPAS");
    const expected = [
      Color.green,
      Color.yellow,
      Color.grey,
      Color.grey,
      Color.grey,
    ];
    expect(result).toEqual(expected);
  });
});
