/**
 * @param {string} s
 */
export function dasherise(s) {

  if (!s) {
    return "";
  }

  return s.replace(" ", "-")      // replace whitespace
    .split(/(?=[A-Z])/)           // split by uppercase characters
    .map((w) => w.toLowerCase())  // lowercase
    .join("-");                   // join with dash
}