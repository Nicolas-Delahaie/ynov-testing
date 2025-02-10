import { describe, it, expect } from "vitest";
import { ErrorType, Result, Strength, isPasswordValid } from "../src";

describe("PasswordValidator", () => {
  it("should contain at least 8 characters", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Short1!");
    expect(result.error).toBe("invalidLength");
  });

  it("should contain an uppercase letter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "nicolas1!");
    expect(result.error).toBe("noUpperCase");
  });

  it("should contain a lowercase letter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "NICOLAS1!");
    expect(result.error).toBe("noLowerCase");
  });

  it("should contain one number", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas!");
    expect(result.error).toBe("noNumber");
  });

  it("should contain special caracter", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolass1");
    expect(result.error).toBe("noSpecialCharacter");
  });

  it("shouldn't contain space", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas 1!");
    expect(result.error).toBe("hasSpace");
  });

  it("shouldn't contain 3 consecutive characters", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas111!");
    expect(result.error).toBe("hasRepeatingCharacters");
  });

  it("should contain at most 20 characters", () => {
    const result: Result = isPasswordValid(
      "Salutcestcool",
      "Nicolas1!Butabittoolong"
    );
    expect(result.error).toBe("invalidLength");
  });

  it("shouldn't contain username", () => {
    const result: Result = isPasswordValid("nicolas", "Nicolas1!");
    const expectedError: ErrorType = "containsUsername";
    expect(result.error).toBe(expectedError);
  });

  it("shouldn't be a weak password", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Password!1");
    const expectedError: ErrorType = "weakPassword";
    expect(result.error).toBe(expectedError);
  });

  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!");
    const expectedStrength: Strength = "weak";
    expect(result.strength).toBe(expectedStrength);
  });
  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!abcd");
    const expectedStrength: Strength = "medium";
    expect(result.strength).toBe(expectedStrength);
  });
  it("should be weak", () => {
    const result: Result = isPasswordValid("Salutcestcool", "Nicolas1!abcdefg");
    const expectedStrength: Strength = "strong";
    expect(result.strength).toBe(expectedStrength);
  });
});
