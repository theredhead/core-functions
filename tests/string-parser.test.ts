/** @format */

import { StringParser } from "../src/strings/string-parser";

describe("StringParser", () => {
  const text = 'Hello, "amazing typescript" World!';
  it("has the basic API I want", () => {
    const parser = new StringParser(text);
    const chars: string[] = [];

    while (!parser.atEnd) {
      chars.push(parser.next());
    }

    const recombined = chars.join("");
    expect(recombined).toEqual(text);
  });

  it("makes building parsers easier", () => {
    const parser = new StringParser(text);

    const snips: string[] = [];

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
          if (snip.length) snips.push(snip);
          snip = "";
          break;
        default:
          snip += char;
          break;
      }
    }
    snips.push(snip);

    expect(snips.length).toEqual(3);
    expect(snips).toEqual(["Hello,", "amazing typescript", "World!"]);
  });
});
