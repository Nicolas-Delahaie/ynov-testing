import { describe, it, expect } from "vitest";
import { ErrorType, Result, Strength, isPasswordValid } from "../src";

describe("PasswordValidator", () => {
  it("should contain at least 8 characters", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Short1!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("invalidLength");
    }
  });

  it("should contain an uppercase letter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "nicolas1!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("noUpperCase");
    }
  });

  it("should contain a lowercase letter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "NICOLAS1!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("noLowerCase");
    }
  });

  it("should contain one number", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("noNumber");
    }
  });

  it("should contain special caracter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolass1");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("noSpecialCharacter");
    }
  });

  it("shouldn't contain space", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas 1!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("hasSpace");
    }
  });

  it("shouldn't contain 3 consecutive characters", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas111!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("hasRepeatingCharacters");
    }
  });

  it("should contain at most 20 characters", () => {
    const result: Result = isPasswordValid(
      "Salutcestcool",
      "Nicolas1!Butabittoolong"
    );

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("invalidLength");
    }
  });

  it("shouldn't contain username", () => {
    const result: Result = isPasswordValid("nicolas", "Nicolas1!");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("containsUsername");
    }
  });

  it("shouldn't be a weak password", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Password!1");

    if (result.isValid) {
      throw new Error("Shoudn't be valid");
    } else {
      expect(result.error).toBe<ErrorType>("weakPassword");
    }
  });

  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!");

    if (result.isValid) {
      expect(result.strength).toBe<Strength>("weak");
    } else {
      throw new Error("Shoud be valid");
    }
  });

  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!abcd");

    if (result.isValid) {
      expect(result.strength).toBe<Strength>("medium");
    } else {
      throw new Error("Shoud be valid");
    }
  });

  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!abcdefg");

    if (result.isValid) {
      expect(result.strength).toBe<Strength>("strong");
    } else {
      throw new Error("Shoud be valid");
    }
  });
});
