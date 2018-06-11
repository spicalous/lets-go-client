import 'promise-polyfill/src/polyfill';
import { onDOMReady } from '../../src/util/dom-ready'
import IndexContainer from './index-container';

const indexContainer = new IndexContainer();

onDOMReady(() => {
  indexContainer.initDOM(document.body);
})