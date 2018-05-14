import io from "socket.io-client";
import HomeScreen from "./home-screen";

const socket = io(`${window.location.hostname}:3000`);

window.onload = function() {
  const homeScreen = new HomeScreen(socket);
}
