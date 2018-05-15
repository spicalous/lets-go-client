import io from "socket.io-client";
import IndexScreen from "./index-screen";

const socket = io(`${window.location.hostname}:3000`);

function onDOMContentLoaded() {
  const indexScreen = new IndexScreen(socket);
  document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);