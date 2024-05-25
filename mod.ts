import { assert } from "@std/assert";
const MARGIN_PREFIX = "|";

/**
 * Inspired by Kotlins `trimMargin` for handling indentation for multiline string.
 */

export function multiline(
  strings: TemplateStringsArray,
  ...args: unknown[]
): string {
  const expressions = [...args, ""];
  const lines = strings.map((part, index) => part + expressions[index]).join("")
    .split("\n");

  return lines.map((line) => {
    if (line.trim().length === 0) {
      return line.trim();
    }
    const [indentation, ...content] = line.split(MARGIN_PREFIX);
    assert(indentation !== undefined, `Line '${line}' could not been parsed.`);
    assert(
      indentation.trim().length === 0,
      `Line '${line}' could not been parsed. Only whitespace allowed before prefix '${MARGIN_PREFIX}'`,
    );
    return content.join(MARGIN_PREFIX);
  }).join("\n");
}
