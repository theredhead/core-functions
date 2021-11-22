/** @format */

import { getPeopleMmockData } from "./people.mock-data";
import { sort, by } from "./../src/index";

describe("sort", () => {
  it("sorts without modifying the original data", () => {
    const people = getPeopleMmockData();
    const sorted = sort(
      people,
      by((p) => p.lastName)
    );

    expect(people).not.toEqual(sorted);
  });
});
