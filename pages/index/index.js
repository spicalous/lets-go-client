import "promise-polyfill/src/polyfill";
import { onDOMReady } from "../../src/util/dom-ready";
import IndexContainer from "./index-container";

onDOMReady(() => {
  new IndexContainer(document.body);
});