import 'promise-polyfill/src/polyfill';
import IndexScreen from './index-screen';

function onDOMContentLoaded() {
  new IndexScreen();
  document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);