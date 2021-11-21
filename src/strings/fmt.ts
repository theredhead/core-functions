/** @format */

import { KeyValueMap } from "./types";

export const fmt = (template: string, args: KeyValueMap<any>): string => {
  let result = template;
  for (let key of Object.keys(args)) {
    const placeholder = new RegExp(`{${key}}`, "g");
    result = result.replace(placeholder, args[key]);
  }
  return result;
};
