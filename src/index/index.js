import io from "socket.io-client";
import IndexScreen from "./index-screen";

const socket = io(`${window.location.hostname}:3000`);

window.onload = function() {
  const indexScreen = new IndexScreen(socket);
}
