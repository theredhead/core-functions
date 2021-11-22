/**
 * Return a string identical to the input string but with the first character uppercased
 *
 * @format
 * @param s
 * @param useLocale
 * @returns
 */
export const ucFirst = (s: string): string => {
  if (s.length === 0) return "";
  return s.substr(0, 1).toLocaleUpperCase() + s.substr(1);
};

/**
 * Return a string identical to the input string but with the first character lowercased
 *
 * @param s
 * @param useLocale
 * @returns
 */
export const lcFirst = (s: string): string => {
  if (s.length === 0) return "";
  return s.substr(0, 1).toLocaleLowerCase() + s.substr(1);
};

/**
 * Transform kebab-case, under_scored and regularly spaced strings into PascalCase
 *
 * @param s
 * @param useLocale
 * @returns
 */
export const pascalize = (s: string): string => {
  return s
    .split(/\s|-|_/)
    .map((p) => ucFirst(p))
    .join("");
};
