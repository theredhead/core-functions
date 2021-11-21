# @theredhead/core-functions

- [@theredhead/core-functions](#theredheadcore-functions)
  - [Purpose](#purpose)
    - [Exposed functions](#exposed-functions)
      - [`replaceAll(template: string, placeholder: string, replacement: string): string`](#replacealltemplate-string-placeholder-string-replacement-string-string)
      - [`fmt(template: string, args: KeyValueMap<any> | any[]): string`](#fmttemplate-string-args-keyvaluemapany--any-string)

## Purpose

Provide utility functions

### Exposed functions

- `replaceAll(template: string, placeholder: string, replacement: string): string`
- `fmt(template: string, args: KeyValueMap<any> | any[]): string`

#### `replaceAll(template: string, placeholder: string, replacement: string): string`

Replaces all occurrences of a placeholder in a given template string with the given replacement. An unfortunate requirement because the javascript string object cannot reliably do this by itselt (until ECMA2021).

#### `fmt(template: string, args: KeyValueMap<any> | any[]): string`

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
