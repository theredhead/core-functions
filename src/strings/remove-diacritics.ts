/** @format */

/**
 * Replace all accented characters in string s with the most intuitive ascii character.
 *
 * @param s
 * @returns
 */
export const removeDiacritics = (s: string): string => {
  return s.normalize("NFKD").replace(/[\u0300-\u036F]/g, "");
};
