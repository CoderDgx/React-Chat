import type { ChatStore } from "./store";

export const droppedSelector = (state: ChatStore) => {
  return state.dropped;
};

export const activeGroupUserSelector = (state: ChatStore) => {
  return state.activeGroupUser;
};

export const activeRoomSelector = (state: ChatStore) => {
  return state.activeRoom;
};

export const groupGatherSelector = (state: ChatStore) => {
  return state.groupGather;
};

export const friendGatherSelector = (state: ChatStore) => {
  return state.friendGather;
};

export const userGatherSelector = (state: ChatStore) => {
  return state.userGather;
};

export const unReadGatherSelector = (state: ChatStore) => {
  return state.unReadGather;
};
