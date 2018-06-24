let started = false;
let heapSize = 0;

/**
 * @param {number} ms
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Collect garbage and save the current JS heap size
 * @returns {Promise}
 */
export async function startMeasuring() {

  if (started) {
    throw new Error("Already started monitoring!");
  }

  started = true;

  await sleep(5000);
  window.gc();
  await sleep(5000);
  window.gc();

  heapSize = window.performance.memory.usedJSHeapSize;
}

/**
 * Collect garbage and return the difference from the start of measuring till now
 * @returns {Promise}
 */
export async function stopMeasuring() {

  let result = 0;

  if (!started) {
    throw new Error("Haven't started monitoring!");
  }

  started = false;

  await sleep(5000);
  window.gc();
  await sleep(5000);
  window.gc();

  result = window.performance.memory.usedJSHeapSize - heapSize;

  heapSize = 0;

  return result;
}