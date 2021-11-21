/**
 * Replace all occurrences of a placeholder in a template with a replacement
 *
 * @format
 * @param template
 * @param placeholder
 * @param replacement
 * @returns
 */

export const replaceAll = (
  template: string,
  placeholder: string,
  replacement: string
): string => {
  let result = template;
  let before: string;

  do {
    before = result;
    result = result.replace(placeholder, replacement);
  } while (result !== before);

  return result;
};
