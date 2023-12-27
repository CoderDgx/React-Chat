import { create } from "zustand";
import type { ChatState } from "./state";
import { chatState } from "./state";
import { useAppStore } from "../app";
import { DEFAULT_GROUP } from "../../const";

interface ChatAction {
  setDropped: (payload: any) => void;
  setActiveGroupUser: (payload: ActiveGroupUser) => void;
  addGroupMessage: (payload: GroupMessage) => void;
  setGroupMessages: (payload: GroupMessage[]) => void;
  addFriendMessage: (payload: FriendMessage) => void;
  setFriendMessages: (payload: FriendMessage[]) => void;
  setActiveRoom: (payload: Friend & Group) => void;
  setGroupGather: (payload: Group) => void;
  setUserGather: (payload: User) => void;
  setFriendGather: (payload: User) => void;
  deleteGroup: (payload: GroupMap) => void;
  deleteFriend: (payload: UserMap) => void;
  addUnreadGather: (payload: string) => void;
  clearUnreadGather: (payload: string) => void;
}

export type ChatStore = ChatState & ChatAction;

export const useChatStore = create<ChatStore>((set, get) => ({
  ...chatState,
  // 设置用户是否处于掉线重连状态
  setDropped: (payload) => {
    set({ dropped: payload });
  },
  // 设置群在线人数
  setActiveGroupUser: (payload) => {
    set((state) => {
      let userGather = state.userGather;
      for (const user of Object.values(payload[DEFAULT_GROUP])) {
        // 如果当前userGather没有该在线用户, 应该马上存储, 不然该在下雨用户发消息, 就看不见他的信息
        userGather[user.userId] = user;
      }
      return { ...state, activeGroupUser: payload, userGather };
    });
  },
  // 新增一条群消息
  addGroupMessage: (payload) => {
    set((state) => {
      let groupGather = state.groupGather;
      if (groupGather[payload.groupId].messages) {
        groupGather[payload.groupId].messages!.push(payload);
      } else {
        groupGather[payload.groupId].messages = [payload];
      }
      return { ...state, groupGather: groupGather };
    });
  },
  // 设置群消息
  setGroupMessages: (payload) => {
    set((state) => {
      let groupGather = state.groupGather;
      if (payload && payload.length) {
        groupGather[payload[0].groupId].messages = payload;
      }
      return { ...state, groupGather: groupGather };
    });
  },
  // 新增一条私聊消息
  addFriendMessage: (payload) => {
    set((state) => {
      let userId = useAppStore.getState().user.userId;
      let friendGather = state.friendGather;
      if (payload.friendId === userId) {
        if (friendGather[payload.userId].messages) {
          friendGather[payload.userId].messages!.push(payload);
        } else {
          friendGather[payload.userId].messages = [payload];
        }
      } else {
        if (friendGather[payload.friendId].messages) {
          friendGather[payload.friendId].messages!.push(payload);
        } else {
          friendGather[payload.friendId].messages = [payload];
        }
      }
      return { ...state, friendGather: friendGather };
    });
  },
  // 设置私聊记录
  setFriendMessages: (payload) => {
    set((state) => {
      let userId = useAppStore.getState().user.userId;
      let friendGather = state.friendGather;
      if (payload && payload.length) {
        if (payload[0].friendId === userId) {
          friendGather[payload[0].userId].messages = payload;
        } else {
          friendGather[payload[0].friendId].messages = payload;
        }
      }
      return { ...state, friendGather: friendGather };
    });
  },
  // 设置当前聊天对象(群或好友)
  setActiveRoom: (payload) => {
    set({ activeRoom: payload });
  },
  // 设置所有的群的群详细信息(头像,群名字等)
  setGroupGather: (payload) => {
    set((state) => {
      let groupGather = state.groupGather;
      groupGather[payload.groupId] = payload;
      return { ...state, groupGather: groupGather };
    });
  },
  // 设置所有的用户的用户详细信息(头像,昵称等)
  setUserGather: (payload) => {
    set((state) => {
      let userGather = state.userGather;
      userGather[payload.userId] = payload;
      return { ...state, userGather: userGather };
    });
  },
  // 设置所有的好友的用户详细信息(头像,昵称等)
  setFriendGather: (payload) => {
    set((state) => {
      let friendGather = state.friendGather;
      friendGather[payload.userId] = payload;
      return { ...state, friendGather: friendGather };
    });
  },
  // 退群
  deleteGroup: (payload) => {
    set((state) => {
      let groupGather = state.groupGather;
      delete groupGather[payload.groupId];
      return { ...state, groupGather: groupGather };
    });
  },
  // 删好友
  deleteFriend: (payload) => {
    set((state) => {
      let friendGather = state.friendGather;
      delete friendGather[payload.friendId];
      return { ...state, friendGather: friendGather };
    });
  },
  // 给某个聊天组添加未读消息
  addUnreadGather: (payload) => {
    set((state) => {
      let unReadGather = state.unReadGather;
      if (!unReadGather[payload]) {
        unReadGather[payload] = 1;
      } else {
        unReadGather[payload] += 1;
      }
      return { ...state, unReadGather: unReadGather };
    });
  },
  // 给某个聊天组清空未读消息
  clearUnreadGather: (payload) => {
    set((state) => {
      let unReadGather = state.unReadGather;
      unReadGather[payload] = 0;
      return { ...state, unReadGather: unReadGather };
    });
  },
}));
