import type { SocketStore } from "./store";

export const useSocketSelector = (state: SocketStore) => {
  return state.socket;
}