/** @format */

import { replaceAll } from "./replace-all";
import { KeyValueMap } from "./types";

/**
 * Replace placeholders in a template string
 *
 * will replace named placeholders with values from an object (KeyValueMap) argument
 * or numbered placeholder from an array argument.
 *
 * @param template
 * @param args
 * @returns
 */
export const fmt = (
  template: string,
  args: KeyValueMap<any> | any[]
): string => {
  if (Array.isArray(args)) {
    let result = template;
    for (let ix = 0; ix < args.length; ix++) {
      const placeholder = `{${ix}}`;
      result = replaceAll(result, placeholder, args[ix]);
    }
    return result;
  } else {
    let result = template;
    for (let key of Object.keys(args)) {
      const placeholder = `{${key}}`;
      result = replaceAll(result, placeholder, args[key]);
    }
    return result;
  }
};
