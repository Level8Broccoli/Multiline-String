const MARGIN_PREFIX = "|" as const;

/**
 * Inspired by Kotlins `trimMargin` for handling indentation for multiline string.
 */

type MultilineTagFunction = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) => string;

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

export const multiline = createMultilineTagFunction();
export const multilineCustom = createMultilineTagFunction;
