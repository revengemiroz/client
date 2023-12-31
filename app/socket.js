// utils/socket.js
import io from "socket.io-client";

let socket;

const createSocketConnection = () => {
  if (!socket) {
    socket = io("https://backend-4sah.onrender.com/");

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
