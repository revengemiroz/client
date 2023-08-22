// utils/socket.js
import io from "socket.io-client";

let socket;

const createSocketConnection = () => {
  if (!socket) {
    const hostname = window.location.hostname;
    const port = window.location.port;

    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const serverUrl = isLocal
      ? `http://localhost:4001`
      : `https://tricky-boot-fox.cyclic.cloud`;

    socket = io(serverUrl);

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

const getSocket = () => {
  if (!socket) {
    createSocketConnection();
  }

  return socket;
};

export { createSocketConnection, disconnectSocket, getSocket };
