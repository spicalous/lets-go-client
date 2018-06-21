let started = false;
let heapSize = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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