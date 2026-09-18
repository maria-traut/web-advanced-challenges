import { io } from "socket.io-client";

// Create the client connection once and share it, so re-renders don’t open new ones.
// Connects with Socket.io-Server, that runs on localhost:3000 (= backend).
export const socket = io("http://localhost:3000", { autoConnect: false });
