
/**
 * @param {Function} fn
 */
export function onDOMReady(fn) {

  /**
   * Removes listener and executes function
   */
  const onDOMContentLoaded = function() {
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
    fn();
  };
  document.addEventListener("DOMContentLoaded", onDOMContentLoaded, false);
}