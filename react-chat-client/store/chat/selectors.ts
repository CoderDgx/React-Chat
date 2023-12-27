import type { ChatStore } from "./store";

export const useDroppedSelector = (state: ChatStore) => {
  return state.dropped;
};

export const useActiveGroupUserSelector = (state: ChatStore) => {
  return state.activeGroupUser;
};

export const useActiveRoomSelector = (state: ChatStore) => {
  return state.activeRoom;
};

export const useGroupGatherSelector = (state: ChatStore) => {
  return state.groupGather;
};

export const useFriendGatherSelector = (state: ChatStore) => {
  return state.friendGather;
};

export const useUserGatherSelector = (state: ChatStore) => {
  return state.userGather;
};

export const useUnReadGatherSelector = (state: ChatStore) => {
  return state.unReadGather;
};
