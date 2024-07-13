# Multiline-String

Help improve readability of complex multiline strings.

Inspired by
[Kotlin's `trimMargin`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
function.

This package exports two functions:

- `multiline`: a tag function
- `multilineCustom`: a function that returns a tag function

## Installation

Deno:

```ts
import { multiline, multilineCustom } from "jsr:@lvl8/multiline-string^0.1.2";
```

Node / other runtimes:

```sh
npx jsr add @lvl8/multiline-string
```

```ts
import { multiline, multilineCustom } from "@lvl8/multiline-string";
```

## Usage

```ts
multiline`
  |simple string
`;
```

```ts
multiline`
  |first line
  |second line
`;
```

```ts
multilineCustom("#")`
  #first line
  #second line
`;
```

## Examples

```ts
import { multiline as m } from "@lvl8/multiline-string";

const str = m`
  |first line
  |  second line with indentation
`;

// equals to "first line\n  second line with indentation"
```

```ts
import { multiline as m, multilineCustom as mc } from "@lvl8/multiline-string";

const list = ["one", "two"];

const str = mc("$")`
  $first line
  $${
  list.map((entry) =>
    m`
      |> ${entry} <
      `
  ).join("\n")
}
  $last line
`;

// equals to "first line\n> one <\n> two <\nlast line"
```
