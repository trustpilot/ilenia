const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
const replaceRegex = (tag, key) => new RegExp(escapeRegex(`${tag.start}${key}${tag.end}`), 'g');

const combineStrings = ([a, ...rest], s) =>
  typeof s === 'string' && typeof a === 'string'
    ? [s + a, ...rest]
    : [s, a, ...rest];

const isNotAnEmptyString = (s) => typeof s !== 'string' || s.length > 0;

export default (string = '', interpolations = {}, tag = { start: '{', end: '}' }) => {
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
  const result = Array.from(replace(keys, string))
    .reduceRight(combineStrings, [''])
    .filter(isNotAnEmptyString);

  if (result.length === 0) {
    return '';
  } else if (result.length === 1) {
    return result[0];
  } else {
    return result;
  }
};
