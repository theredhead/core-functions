/** @format */

import { fmt } from "../src/strings/fmt";
import { replaceAll } from "../src/strings/replace-all";

describe("replaceAll replaces all placeholders", () => {
  it("replaces a placeholder", () => {
    const result = replaceAll(
      "The quick brown fox jumps over the lazy dog.",
      "quick",
      "slow"
    );

    expect(result).toBe("The slow brown fox jumps over the lazy dog.");
  });

  it("replaces all placeholders", () => {
    const result = replaceAll(
      "one mississippi, two mississippi, three mississippi, four mississippi, five mississippi",
      "mississippi",
      "apple"
    );

    expect(result).toBe(
      "one apple, two apple, three apple, four apple, five apple"
    );
  });
});

describe("fmt is a formatting function", () => {
  it("can simplify string expansion with multiple placeholders", () => {
    const template = "{foo} {bar} {baz} sit amet.";
    const result = fmt(template, {
      foo: "Lorum",
      bar: "ipsum",
      baz: "dolar",
    });

    expect(result).toBe("Lorum ipsum dolar sit amet.");
  });

  it("can replace a named placholder more than once per template", () => {
    const template = "{a} {a} {b}";
    const result = fmt(template, {
      a: "hip",
      b: "hurray",
    });

    expect(result).toBe("hip hip hurray");
  });

  it("can replace handle numbered placholders using arrays as args", () => {
    const template = "{0} {0} {1}";
    const result = fmt(template, ["hip", "hurray"]);

    expect(result).toBe("hip hip hurray");
  });
});
