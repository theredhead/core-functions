/** @format */

import { replaceAll } from "..";
import { removeDiacritics } from "./remove-diacritics";

export const sluggify = (s: string): string => {
  const allowedCharacters = "abcdefghijklmnopqrstuvwxyz-_0123456789";
  const lowered = replaceAll(removeDiacritics(s.toLowerCase()), " ", "-");

  const result: string[] = [];
  for (let ix = 0; ix < s.length; ix++) {
    const c = lowered.charAt(ix);
    if (allowedCharacters.indexOf(c) > -1) {
      result.push(c);
    }
  }

  return result.join("");
};
