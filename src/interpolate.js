const escapeRegex = str => str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
const replaceRegex = (tag, key) =>
  new RegExp(escapeRegex(`${tag.start}${key}${tag.end}`), "g");

const combineStrings = ([a, ...rest], s) =>
  (typeof s === "string" || typeof s === "number") &&
  (typeof a === "string" || typeof a === "number")
    ? [s + a, ...rest]
    : [s, a, ...rest];

const isNotAnEmptyString = s => typeof s !== "string" || s.length > 0;

export default (
  string = "",
  interpolations = {},
  tag = { start: "[", end: "]" }
) => {
  function* replace(interpolationKeys, input) {
    if (interpolationKeys.length === 0) {
      yield input;
      return;
    }

    const [key, ...remaining] = interpolationKeys;
    const pieces = input.split(replaceRegex(tag, key));

    yield* replace(remaining, pieces.shift());
    while (pieces.length > 0) {
      yield interpolations[key];
      yield* replace(remaining, pieces.shift());
    }
  }

  const keys = Object.keys(interpolations);
  const segments = replace(keys, string);
  return Array.from(segments)
    .reduceRight(combineStrings, [""])
    .filter(isNotAnEmptyString);
};
