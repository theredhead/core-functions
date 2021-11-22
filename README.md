# @theredhead/core-functions

- [@theredhead/core-functions](#theredheadcore-functions)
  - [Purpose](#purpose)
    - [Exposed functionality](#exposed-functionality)
      - [String manipulation](#string-manipulation)
        - [`replaceAll(template: string, placeholder: string, replacement: string): string`](#replacealltemplate-string-placeholder-string-replacement-string-string)
        - [`fmt(template: string, args: KeyValueMap<any> | any[]): string`](#fmttemplate-string-args-keyvaluemapany--any-string)
      - [Searching and sorting arrays](#searching-and-sorting-arrays)
        - [`search<T>(arr: T[], expressionOrPredicate: string|((o: T) => boolean)): T[]`](#searchtarr-t-expressionorpredicate-stringo-t--boolean-t)
        - [`makeMatchesExpressionPredicate<T>(expression: string, maximumDepth: number = 5): (o: T) => boolean`](#makematchesexpressionpredicatetexpression-string-maximumdepth-number--5-o-t--boolean)
        - [`toSearchable = (o: any, maximumDepth: number = toSearchableMaximumTraversalDepth): string`](#tosearchable--o-any-maximumdepth-number--tosearchablemaximumtraversaldepth-string)

## Purpose

Provide utility functions

### Exposed functionality

#### String manipulation

##### `replaceAll(template: string, placeholder: string, replacement: string): string`

Replaces all occurrences of a placeholder in a given template string with the given replacement. An unfortunate requirement because the javascript string object cannot reliably do this by itselt (until ECMA2021).

##### `fmt(template: string, args: KeyValueMap<any> | any[]): string`

Replaces placeholders in template strings with replacements from an array or KeyValueMap argument. Keys or indices must be marked for replacement in the template by enclosing them in accolades.

When using a KeyValueMap, marked keys from the map are replaced in the template with their values from the object.

```typescript
  const template = "{foo} {bar} {baz} sit amet.";
  const result = fmt(template, {
    foo: "Lorum",
    bar: "ipsum",
    baz: "dolar",
  });

  expect(result).toBe("Lorum ipsum dolar sit amet.");
```

When using an array, each marked index from the array is replaced with its' corresponding value in the array.

```typescript
  const template = "{0} {0} {0} sit amet.";
  const result = fmt(template, [
    "Lorum",
    "ipsum",
    "dolar",
  ]);

  expect(result).toBe("Lorum ipsum dolar sit amet.");
```

#### Searching and sorting arrays

##### `search<T>(arr: T[], expressionOrPredicate: string|((o: T) => boolean)): T[]`

Provices case insensitive and accent sensitive search.

Filters an array (without modifying the original array) by comparing each entry to a search expression. a search expression is a string that is considered a whitespace seperated list of snippets. In order to be "found" an item in the array is converted to text and each snippet must be present in the resulting text.

in its' simplest form usable as:

```typescript
  const result = search(haystach, 'needle');
```

or:

```typescript
  const result = search(items, o => o.visible);
```

##### `makeMatchesExpressionPredicate<T>(expression: string, maximumDepth: number = 5): (o: T) => boolean`

Used to create a predicate that can be used to evaluate a search expression against an object.

##### `toSearchable = (o: any, maximumDepth: number = toSearchableMaximumTraversalDepth): string`

Flattens an object to a searchable piece of text.