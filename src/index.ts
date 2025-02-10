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

export type Result = {
  isValid: boolean;
  error?: ErrorType;
  strength?: Strength;
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
  let error: ErrorType | undefined;
  if (password.length < 8) error = "invalidLength";
  else if (!/[a-z]/.test(password)) error = "noLowerCase";
  else if (!/[A-Z]/.test(password)) error = "noUpperCase";
  else if (!/[0-9]/.test(password)) error = "noNumber";
  else if (!/[@#$%^&+=!]/.test(password)) error = "noSpecialCharacter";
  else if (/ /.test(password)) error = "hasSpace";
  else if (/(.)\1\1/.test(password)) error = "hasRepeatingCharacters";
  else if (/(.)\1\1/.test(password)) error = "hasRepeatingCharacters";
  else if (password.length > 20) error = "invalidLength";
  else if (password.toLowerCase().includes(username.toLowerCase()))
    error = "containsUsername";
  else if (
    weakPassword.includes(password.replace(/[^a-zA-Z]/g, "").toLowerCase())
  )
    error = "weakPassword";

  const strength: Strength =
    error === null || password.length < 10
      ? "weak"
      : password.length < 14
      ? "medium"
      : "strong";

  return { isValid: error !== null, error, strength };
};
