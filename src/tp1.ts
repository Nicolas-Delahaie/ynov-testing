/* -------------------------------------------------------------------------- */
/*                             REGISTER VALIDATION                            */
/* -------------------------------------------------------------------------- */

export type ErrorType =
  | "invalidLength"
  | "noLowerCase"
  | "noUpperCase"
  | "noNumber"
  | "noSpecialCharacter"
  | "hasSpace"
  | "hasRepeatingCharacters"
  | "containsUsername"
  | "weakPassword";

export type Strength = "weak" | "medium" | "strong";

export type Result =
  | {
      isValid: true;
      strength: Strength;
    }
  | {
      isValid: false;
      error: ErrorType;
    };

export const isPasswordValid = (username: string, password: string): Result => {
  const weakPassword = [
    "password",
    "dragon",
    "pussy",
    "baseball",
    "football",
    "letmein",
    "mustang",
    "michael",
    "shadow",
    "master",
    "jennifer",
    "jordan",
    "superman",
    "harley",
    "fuckme",
  ];

  if (password.length < 8) return { isValid: false, error: "invalidLength" };
  if (!/[a-z]/.test(password)) return { isValid: false, error: "noLowerCase" };
  if (!/[A-Z]/.test(password)) return { isValid: false, error: "noUpperCase" };
  if (!/[0-9]/.test(password)) return { isValid: false, error: "noNumber" };
  if (!/[@#$%^&+=!]/.test(password))
    return { isValid: false, error: "noSpecialCharacter" };
  if (/ /.test(password)) return { isValid: false, error: "hasSpace" };
  if (/(.)\1\1/.test(password))
    return { isValid: false, error: "hasRepeatingCharacters" };
  if (/(.)\1\1/.test(password))
    return { isValid: false, error: "hasRepeatingCharacters" };
  if (password.length > 20) return { isValid: false, error: "invalidLength" };
  if (password.toLowerCase().includes(username.toLowerCase()))
    return { isValid: false, error: "containsUsername" };
  if (weakPassword.includes(password.replace(/[^a-zA-Z]/g, "").toLowerCase()))
    return { isValid: false, error: "weakPassword" };

  return {
    isValid: true,
    strength:
      password.length < 10
        ? "weak"
        : password.length < 14
        ? "medium"
        : "strong",
  };
};
