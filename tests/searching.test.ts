/** @format */

import { getPeopleMmockData } from "./people.mock-data";
import {
  getSearchableBooleanFalse,
  setSearchableBooleanFalse,
  getSearchableBooleanTrue,
  setSearchableBooleanTrue,
  parseSearchExpression,
  SearchSnippetType,
  search,
  setSearchableMaximumTraversalDepth,
} from "../src/index";

describe("parseSearchExpression", () => {
  const pe = (s: string): number => parseSearchExpression(s).snippets.length;

  it("handles quotes as expected", () => {
    expect(pe("Hello, World!")).toBe(2);
    expect(pe('"Hello, World!"')).toBe(1);
    // edge case: no closing quote
    expect(pe('"Hello, World!')).toBe(1);

    expect(pe('Albert "general relativity" Einstein')).toBe(3);
  });

  it("is optionally accent sensitive", () => {
    const people = getPeopleMmockData();
    const expression = parseSearchExpression("Björk");
    expression.caseSensitive = false;
    expression.accentSensitive = true;
    const accented = search(people, expression);

    expect(accented.length).toBe(1);

    const expression2 = parseSearchExpression("Bjork");
    expression2.caseSensitive = false;
    expression2.accentSensitive = true;
    const notAccented = search(people, expression2);

    expect(notAccented.length).toBe(0);
  });
  it("lets !snippets be matched exactly caseSensitive, not(accentSensitive)", () => {
    const expression = parseSearchExpression('"!Keanu Reeves"');
    expression.snippets.forEach((s) => console.log(s));
    expect(expression.snippets.length).toBe(1);
    expect(expression.snippets[0].text).toBe("Keanu Reeves");

    expression.caseSensitive = true;
    expression.accentSensitive = false;

    const result = search(getPeopleMmockData(), expression);
    expect(result.length).toBe(1);
    expect(result[0].fictional).toBe(true);

    const snippet = expression.snippets[0];
    expect(snippet.type).toBe(SearchSnippetType.EXACT);
  });

  it("lets !snippets be matched exactly not(caseSensitive), accentSensitive", () => {
    const expression = parseSearchExpression('John "!keanu reeves" Wick');
    expression.snippets.forEach((s) => console.log(s));
    expect(expression.snippets.length).toBe(3);

    expression.caseSensitive = false;
    expression.accentSensitive = true;

    const result = search(getPeopleMmockData(), expression);
    expect(result.length).toBe(1);
    expect(result[0].fictional).toBe(true);

    expect(expression.snippets[0].type).toBe(SearchSnippetType.CONTAINS);
    expect(expression.snippets[1].type).toBe(SearchSnippetType.EXACT);
    expect(expression.snippets[2].type).toBe(SearchSnippetType.CONTAINS);
  });

  it("handles longer expressions with multiple parts ", () => {
    const expression = parseSearchExpression(
      'The "quick brown" "fox" jumps over the lazy dog.'
    );
    expect(expression.snippets.length).toBe(8);

    const expression2 = parseSearchExpression(
      'The"quick brown""fox"jumpsover"the lazy dog".'
    );
    expect(expression2.snippets.length).toBe(6);
  });
});

describe("search", () => {
  it("by string expression is case insensitive", () => {
    const people = getPeopleMmockData();
    const skywalkers = search(people, "skywalker");
    expect(skywalkers.length).toBe(2);

    const foo = search(people, 'albert "genaral relativity" Einstein');
    expect(foo.length).toBe(1);
  });

  it("is accent insensitive by default", () => {
    const people = getPeopleMmockData();

    const expression = parseSearchExpression("skywâlkér");
    expect(expression.accentSensitive).toBe(false);

    const skywalkers = search(people, "skywâlkér");
    expect(skywalkers.length).toBe(2);
  });

  it("is optionally accent sensitive", () => {
    const people = getPeopleMmockData();

    const expression = parseSearchExpression("skywâlkér");
    expression.accentSensitive = true;
    expect(expression.accentSensitive).toBe(true);

    const skywalkers = search(people, expression);
    expect(skywalkers.length).toBe(0);
  });

  it("is optionally accent sensitive and case sensitive", () => {
    const people = getPeopleMmockData();

    const expression = parseSearchExpression("skywâlkér");
    expression.accentSensitive = true;
    expression.caseSensitive = true;
    expect(expression.accentSensitive).toBe(true);
    expect(expression.caseSensitive).toBe(true);

    const skywalkers = search(people, expression);
    expect(skywalkers.length).toBe(0);
  });

  it("matches ALL terms against ANY property", () => {
    const people = getPeopleMmockData();
    const skywalkers = search(people, "sky walk mark ham luk");
    expect(skywalkers.length).toBe(1);

    const marks = search(people, "skywalker hamill");
    expect(marks.length).toBe(1);
  });

  it("finds booleans", () => {
    const mockData: any[] = [1, 2, true, false, "banana"];

    expect(search(mockData, getSearchableBooleanTrue()).length).toBe(1);
    expect(search(mockData, getSearchableBooleanFalse()).length).toBe(1);

    setSearchableBooleanTrue("Yep");
    setSearchableBooleanFalse("Nope");

    expect(search(mockData, "Yep").length).toBe(1);
    expect(search(mockData, "Nope").length).toBe(1);
  });

  it("will not traverse forever", () => {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: {
                f: {
                  g: {
                    h: {
                      i: {
                        j: {
                          k: {
                            l: {
                              m: {
                                n: {
                                  o: {
                                    p: {
                                      q: {
                                        r: {
                                          s: {
                                            t: {
                                              u: {
                                                v: {
                                                  w: {
                                                    x: {
                                                      y: {
                                                        z: "We'll never get here...",
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    expect(() => search([obj], "hi!")).not.toThrow();

    const initial = setSearchableMaximumTraversalDepth(50);
    expect(search([obj], "never").length).toBe(1);
    setSearchableMaximumTraversalDepth(initial);
  });
});
