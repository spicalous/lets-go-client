/**
 * @param {string} key
 * @param {string} [s]
 * @returns {string}
 */
export function extract(key, s) {

  if (!s) {
    return "";
  }

  if (s.substring(0, 1) === "?") {
    s = s.substring(1, s.length);
  }

  const queryParam = s
    .split("&")
    .map((pair) => pair.split("="))
    .filter((pair) => pair[0] === key);

  return queryParam.length ? queryParam[0][1] : "";
}