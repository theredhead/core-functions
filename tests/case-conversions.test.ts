/** @format */

import { pascalize, ucFirst, lcFirst } from "../src";

// Á É Í Ó Ú Ñ - á é í ó ú ñ...

describe("ucFirst", () => {
  it("does not touch empty strings", () => {
    expect(ucFirst("")).toEqual("");
  });

  it("Converts the first character to uppercase without touching the rest of the string", () => {
    expect(ucFirst("hello")).toEqual("Hello");
  });

  it("Converts the first character to uppercase including accent", () => {
    expect(ucFirst("ábcdefg")).toEqual("Ábcdefg");
  });
});

describe("lcFirst", () => {
  it("does not touch empty strings", () => {
    expect(lcFirst("")).toEqual("");
  });

  it("Converts the first character to lowercase without touching the rest of the string", () => {
    expect(lcFirst("Hello")).toEqual("hello");
  });

  it("Converts the first character to lowercase including accent", () => {
    expect(lcFirst("Ábcdefg")).toEqual("ábcdefg");
  });
});

describe("pascalize", () => {
  it("handles strings with spaces", () => {
    expect(pascalize("This is a test")).toEqual("ThisIsATest");
  });

  it("handles strings with underscores", () => {
    expect(pascalize("This_is_a_test")).toEqual("ThisIsATest");
  });

  it("handles strings with dashes", () => {
    expect(pascalize("This-is-a-test")).toEqual("ThisIsATest");
  });

  it("handles strings with a combination of spaces, underscores, and dashes", () => {
    expect(pascalize("This_is-a test")).toEqual("ThisIsATest");
  });
});
