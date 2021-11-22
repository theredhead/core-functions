/** @format */

import { sluggify } from "../src/index";

describe("sluggify", () => {
  it("makes url passable versions of names", () => {
    const tests: { input: string; expectedSlug: string }[] = [
      { input: "Hello, World!", expectedSlug: "hello-world" },
      { input: "Héllõ, Ŵóŗľď!", expectedSlug: "hello-world" },
    ];

    for (let test of tests) {
      expect(sluggify(test.input)).toEqual(test.expectedSlug);
    }
  });
});
