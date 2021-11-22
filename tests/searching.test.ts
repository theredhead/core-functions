/** @format */

import {
  toSearchable,
  toSearchableMaximumTraversalDepth,
  makeMatchesExpressionPredicate,
} from "./../src/arrays/searching";
import { getPeopleMmockData } from "./people.mock-data";
import { search } from "../src/index";

describe("search by string expression", () => {
  it("is case insensitive", () => {
    const people = getPeopleMmockData();
    const skywalkers = search(people, "skywalker");

    expect(skywalkers.length).toBe(2);
  });

  it("is accent sensitive", () => {
    const people = getPeopleMmockData();
    const skywalkers = search(people, "é");

    expect(skywalkers.length).toBe(0);
  });
});

describe("search by predicate", () => {
  it("can use a predicate instead of an expression", () => {
    const people = getPeopleMmockData();
    const fictional = search(people, (o) => o.fictional == true);

    expect(fictional).not.toEqual(people);
  });
});

describe("search works with more simple expressions", () => {
  it("has matches ALL terms against ANY property", () => {
    const people = getPeopleMmockData();
    const skywalkers = search(people, "sky walk");
    expect(skywalkers.length).toBe(2);

    const marks = search(people, "skywalker hamill");
    expect(marks.length).toBe(1);
  });

  it("will not stringify too deep", () => {
    const obj: any = {
      text: "Na",
      more: null,
    };
    obj.more = obj; // would cause an infinite loop when serializing

    let searchable = toSearchable(obj);
    expect(searchable.split(/\s/).length).toBe(
      toSearchableMaximumTraversalDepth
    );

    searchable = toSearchable(obj, 5);
    expect(searchable.split(/\s/).length).toBe(5);
  });
});
describe("makeMatchesExpressionPredicate", () => {
  it("has a default maximumDepth", () => {
    const autoMaxDepthPredicate = makeMatchesExpressionPredicate("foo");
    const explicitMaxDepthPredicate = makeMatchesExpressionPredicate(
      "foo",
      toSearchableMaximumTraversalDepth
    );

    expect(autoMaxDepthPredicate.toString()).toEqual(
      explicitMaxDepthPredicate.toString()
    );
  });
});
