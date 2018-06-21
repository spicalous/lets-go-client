
/**
 * @param {Function} fn
 */
export function onDOMReady(fn) {
  const onDOMContentLoaded = function() {
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
    fn();
  };
  document.addEventListener("DOMContentLoaded", onDOMContentLoaded, false);
}