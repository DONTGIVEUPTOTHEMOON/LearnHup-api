import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const hashPassword = (plainText: string): string => {
  const salt = genSaltSync(12);
  return hashSync(plainText, salt);
};

export const verifyPassword = (
  candidatePassword: string,
  hashVal: string
): boolean => {
  return compareSync(candidatePassword, hashVal);
};
