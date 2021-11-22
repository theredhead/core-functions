/** @format */

import { removeDiacritics } from "../src/index";

describe("removeDiacritics", () => {
  it("removes accents from strings", () => {
    const text = removeDiacritics("Á É Í Ó Ú Ñ - á é í ó ú ñ...");
    expect(text).toEqual("A E I O U N - a e i o u n...");
  });
});
