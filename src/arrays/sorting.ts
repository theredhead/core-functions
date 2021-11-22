/**
 * Get a sorted version of an array wthout modifying the original array.
 * 
 * Intended to be used in conjuncyion with `by` to have a nicely readable sorting API:
 * 
 *   const sorted = sort(people, by(o => o.lastName));
 * 
 * @param arr 
 * @param compareFn 
 * @returns 
 */
export const sort = <T>(arr: T[], compareFn: (a: T, b: T) => number): T[] => {
  const data = [...arr]; // work on a copy
  data.sort(compareFn);
  return data;
}

/**
 * Create a function used with `sort()` to sort arrays of objects
 * 
 * for example:
 *   const sorted = sort(people, by(o => o.lastName));
 * or:
 *    people.sort(by(o => o.lastName));
 */
export const by = <T>(lambda: (obj: T) => any) => {
  return (a: T, b: T): number => {
    const _a = String(lambda(a));
    const _b = String(lambda(b));
    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  };
}