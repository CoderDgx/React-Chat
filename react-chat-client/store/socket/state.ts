import { Socket } from "socket.io-client";

export interface SocketState {
  socket: null | Socket;
}

export const socketState: SocketState = {
  socket: null,
};