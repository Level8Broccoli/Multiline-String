import { assertEquals } from "jsr:@std/assert@^1.0.0";
import { multiline, multilineCustom } from "./multiline-string.ts";

// Single line

Deno.test("Single line, empty", () => {
  const str = multiline``;
  assertEquals(str, "");
});

Deno.test("Single line, without prefix", () => {
  const str = multiline`simple string`;
  assertEquals(str, "simple string");
});

Deno.test("Single line, with prefix", () => {
  const str = multiline`|simple string`;
  assertEquals(str, "simple string");
});

Deno.test("Single line, separate line, without prefix", () => {
  const str = multiline`
    simple string
  `;
  assertEquals(str, "    simple string");
});

Deno.test("Single line, separate line, with prefix", () => {
  const str = multiline`
    |simple string
  `;
  assertEquals(str, "simple string");
});

Deno.test("Single line, separate line, with prefix, only first and last empty line get removed", () => {
  const str = multiline`

    |simple string

  `;
  assertEquals(str, "\nsimple string\n");
});

// Multiple lines

Deno.test("Multiple lines, without prefix", () => {
  const str = multiline`
    first line
    second line
  `;
  assertEquals(str, "    first line\n    second line");
});

Deno.test("Multiple lines, with prefix", () => {
  const str = multiline`
    |first line
    |second line
  `;
  assertEquals(str, "first line\nsecond line");
});

Deno.test("Multiple lines, with prefix, different indentation", () => {
  const str = multiline`
    |first line
      |second line
  `;
  assertEquals(str, "first line\nsecond line");
});

Deno.test("Multiple lines, mixed with/without prefix", () => {
  const str = multiline`
    first line
    |second line
  `;
  assertEquals(str, "    first line\nsecond line");
});

Deno.test("Multiple lines, with prefix, used in data as well", () => {
  const str = multiline`
    |first line | with same divider
    |second line
  `;
  assertEquals(str, "first line | with same divider\nsecond line");
});

// Nested usage

Deno.test("Nested usage, simple", () => {
  const str = multiline`
    |first line
    |${multiline`middle line`}
    |last line
  `;
  assertEquals(str, "first line\nmiddle line\nlast line");
});

Deno.test("Nested usage, complex", () => {
  const list = ["one", "two", "three"];
  const str = multiline`
    |first line
    |${
    list.map((entry) =>
      multiline`
        |> ${entry} <
        `
    ).join("\n")
  }
    |last line
  `;
  assertEquals(str, "first line\n> one <\n> two <\n> three <\nlast line");
});

// Custom prefix

Deno.test("Custom prefix", () => {
  const str = multilineCustom("#")`
    #first line
    #${multiline`middle line`}
    #last line
  `;
  assertEquals(str, "first line\nmiddle line\nlast line");
});
