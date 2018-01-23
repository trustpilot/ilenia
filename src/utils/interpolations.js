const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
const replaceRegex = (tag, key) => new RegExp(escapeRegex(`${tag.start}${key}${tag.end}`, 'g'));

export const interpolate = (string, interpolations, tag = { start: '{', end: '}' }) => Object
  .keys(interpolations)
  .reduce((outputString, key) =>
    outputString.replace(replaceRegex(tag, key), interpolations[key]), string);
