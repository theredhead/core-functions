/** @format */

import { removeDiacritics } from "../index";
import { StringParser } from "../strings/string-parser";

let toSearchableMaximumTraversalDepth = 5;
let toSearchableBooleanTrue = "true";
let toSearchableBooleanFalse = "false";

export const setSearchableMaximumTraversalDepth = (value: number): number => {
  const previous = toSearchableMaximumTraversalDepth;
  toSearchableMaximumTraversalDepth = value;
  return previous;
};

export const getSearchableMaximumTraversalDepth = (): number =>
  toSearchableMaximumTraversalDepth;

export const setSearchableBooleanTrue = (value: string): string => {
  const previous = toSearchableBooleanTrue;
  toSearchableBooleanTrue = value;
  return previous;
};

export const getSearchableBooleanTrue = (): string => toSearchableBooleanTrue;

export const setSearchableBooleanFalse = (value: string): string => {
  const previous = toSearchableBooleanFalse;
  toSearchableBooleanFalse = value;
  return previous;
};

export const getSearchableBooleanFalse = (): string => toSearchableBooleanFalse;

export const parseSearchSnippet = (s: string): SearchSnippet => {
  const token = s.charAt(0);

  switch (token) {
    case "!":
      const rest = s.substr(1);
      return { type: SearchSnippetType.EXACT, text: rest };
    default:
      return { type: SearchSnippetType.CONTAINS, text: s };
  }
};

export const parseSearchExpression = (s: string): SearchExpression => {
  const parser = new StringParser(s);
  const snips = [];

  let snip = "";
  while (!parser.atEnd) {
    const char = parser.next();
    switch (char) {
      case " ":
        if (snip.length) snips.push(snip);
        snip = "";
        break;
      case '"':
        if (snip.length) snips.push(snip);
        snip = parser.until('"').join("");
        snips.push(snip);
        snip = "";
        break;
      default:
        snip += char;
        break;
    }
  }
  if (snip.length) snips.push(snip);

  return <SearchExpression>{
    caseSensitive: false,
    accentSensitive: false,
    snippets: snips.map((snip) => parseSearchSnippet(snip)),
  };
};

export interface SearchExpression {
  caseSensitive: boolean;
  accentSensitive: boolean;
  snippets: SearchSnippet[];
}

export enum SearchSnippetType {
  EXACT = "exact",
  CONTAINS = "contains",
}

export interface SearchSnippet {
  type: SearchSnippetType;
  text: string;
}

export const objectMatchesExpression = (
  o: any,
  expression: SearchExpression
): boolean => {
  const normalize = (
    s: string,
    lowered: boolean,
    stripAccents: boolean
  ): string => {
    return lowered
      ? stripAccents
        ? removeDiacritics(s)
        : s
      : (stripAccents ? removeDiacritics(s) : s).toLocaleLowerCase();
  };

  const valueMatchesSnippet = (s: string, snippet: SearchSnippet): boolean => {
    const haystack = normalize(
      s,
      expression.caseSensitive,
      !expression.accentSensitive
    );
    const needle = normalize(
      snippet.text,
      expression.caseSensitive,
      !expression.accentSensitive
    );

    switch (snippet.type) {
      case SearchSnippetType.EXACT:
        return needle === haystack;
      case SearchSnippetType.CONTAINS:
        return haystack.indexOf(needle) > -1;
    }
  };

  const object_matches_snippet = (
    o: any,
    snippet: SearchSnippet,
    maxDepth: number
  ): boolean => {
    if (maxDepth <= 0) return false;

    switch (typeof o) {
      case "object":
        if (o == null) return false;

        for (let key of Object.keys(o)) {
          if (object_matches_snippet(o[key], snippet, maxDepth--)) {
            return true;
          }
        }
        break;
      case "boolean":
        const boolVal = o ? toSearchableBooleanTrue : toSearchableBooleanFalse;
        return valueMatchesSnippet(boolVal, snippet);
      default:
        return valueMatchesSnippet(String(o), snippet);
    }
    return false;
  };

  let foundMatches = 0;
  expression.snippets.forEach((snippet) => {
    if (
      object_matches_snippet(o, snippet, getSearchableMaximumTraversalDepth())
    ) {
      foundMatches++;
    }
  });
  return foundMatches == expression.snippets.length;
};

export const search = <T>(
  haystack: T[],
  expression: string | SearchExpression
): T[] => {
  const e =
    typeof expression === "string"
      ? parseSearchExpression(expression)
      : expression;
  const result = haystack.filter((o) => objectMatchesExpression(o, e));
  // console.log({ expression: e, found: result });
  return result;
};
