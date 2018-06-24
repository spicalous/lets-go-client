/**
 * Helper function to setup up a test container
 *
 * @param {Element} element
 * @param {string} eventName
 */
export function dispatchEvent(element, eventName) {

  const event = new Event(eventName);
  element.dispatchEvent(event);
}