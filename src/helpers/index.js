const notAlphaNumericUnderscoreNorWhitespace = /[^\w\s]/g;
const whitespace = /\W+/g;

export function kebabCase (string) {
  return string
    .trim()
    .replace(notAlphaNumericUnderscoreNorWhitespace, '')
    .replace(whitespace, '-')
    .toLowerCase();
}