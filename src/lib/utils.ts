import { LanguageOptionType } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildRequest(
  selectedLanguage: LanguageOptionType,
  sourceCode: string
) {
  return {
    language: selectedLanguage.language,
    version: selectedLanguage.version,
    files: [
      {
        content: sourceCode,
      },
    ],
  };
}
