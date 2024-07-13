/**
 * Default prefix
 */
const MARGIN_PREFIX = "|" as const;

export type MultilineTagFunction = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) => string;

/**
 * Returns a tag function with a custom prefix.
 */
function createMultilineTagFunction(
  prefix: string = MARGIN_PREFIX,
): MultilineTagFunction {
  return (
    strings: TemplateStringsArray,
    ...args: unknown[]
  ): string => {
    const expressions = [...args, ""];
    const lines = strings.map((part, index) => part + expressions[index]).join(
      "",
    )
      .split("\n");

    const trimmedLines = lines.map((line) => {
      if (line.trim().length === 0) {
        return line.trim();
      }
      const [first, ...rest] = line.split(prefix);
      if (rest.length === 0) {
        // no `prefix` found
        return first;
      }
      return rest.join(prefix);
    });

    if (trimmedLines.length === 1) {
      return trimmedLines[0];
    }

    const emptyFirst = trimmedLines[0].trim().length === 0;
    const emptyLast = trimmedLines.length > 1 &&
      trimmedLines.at(-1)?.trim().length === 0;

    return trimmedLines.slice(emptyFirst ? 1 : 0, emptyLast ? -1 : undefined)
      .join("\n");
  };
}

/**
 * Tag function that removes first and last empty lines.
 * If the prefix is used on a line (default: "|"), everthing from the start of the line until (including) the first occurence of the prefix is removed.
 *
 * To use a custom prefix, use the constructor function `multilineCustom(prefix: string)`.
 */
export const multiline: MultilineTagFunction = createMultilineTagFunction();

/**
 * Returns a tag function with a custom prefix.
 */
export const multilineCustom: (prefix?: string) => MultilineTagFunction =
  createMultilineTagFunction;
