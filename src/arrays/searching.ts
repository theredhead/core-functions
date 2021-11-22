export let toSearchableMaximumTraversalDepth = 5;
export let toSearchableBooleanTrue = 'true';
export let toSearchableBooleanFalse = 'false';
/**
 * Searches for expression matches in an array.
 * 
 * @param arr 
 * @param expressionOrPredicate 
 * @returns 
 */
export const search = <T>(arr: T[], expressionOrPredicate: string|((o: T) => boolean)): T[] => {
  if (typeof expressionOrPredicate === 'string') {
    const predicate = makeMatchesExpressionPredicate<T>(expressionOrPredicate);
    return [...arr].filter(predicate);
  } else {
    return [...arr].filter(expressionOrPredicate);
  }
}

/**
 * Compares the value tree of an object (so excluding it's property names) to a search expression 
 * and returns a flag indicating wether the object matches de expression.
 * 
 * - An expression is a whitespace seperated string of snippets
 * - Objects are recursively stringified in such a way that all contained values are stringified 
 *   and concatenated together to form one blob of text. There is a maximum depth to the 
 *   stringification of values.
 * - each snippet from the expression must be present in the resulting blob for the object to be
 *   considered a match. They do not need to be in the same property.
 * 
 * @param expression 
 * @returns 
 */
export const makeMatchesExpressionPredicate = <T>(expression: string, maximumDepth: number = -1): (o: T) => boolean => {
  const maxDepth = maximumDepth > -1
    ? maximumDepth
    : toSearchableMaximumTraversalDepth;
  const parts = expression.split(/\s/).map(s => s.toLocaleLowerCase());
  return (o: T) => {
    if (parts.map(part => toSearchable(o, maxDepth).indexOf(part)).some(v => v < 0)) {
      return false
    }
    return true;
  }
}

/**
 * Recursively flattens all values of an object (upto a maximum depth) into a blob of text that
 * can be used to search against.
 * 
 * @param o 
 * @param maximumDepth 
 * @returns 
 */
export const toSearchable = (o: any, maximumDepth: number = toSearchableMaximumTraversalDepth): string => {
  if (maximumDepth < 0) return '';

  if (o === null || o === undefined) {
    return '';
  } else if (Array.isArray(o)) {
    return o.map(
      o => toSearchable(o, maximumDepth - 1)
    ).join(', ').toLocaleLowerCase();
  } else if (typeof o === 'boolean') {
    return o ? toSearchableBooleanTrue : toSearchableBooleanFalse;
  } else if (['object', 'function'].indexOf(typeof o) > -1) {
    return Object.keys(o).map(
      key => toSearchable(o[key], maximumDepth - 1).trim()
    ).join('\n').toLocaleLowerCase()
  }
  // everything else is considered "stringable"
  return String(o).toLocaleLowerCase().trim();
}
