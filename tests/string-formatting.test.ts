/** @format */

import { fmt } from "../src/strings/fmt";

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
});
