import { SocketState, socketState } from "./state";
import { create } from "zustand";
import { useAppStore } from "../app";
import { io } from "socket.io-client";
import { useChatStore } from "../chat";
import { message } from "antd";
import { use } from "react";
import { DEFAULT_GROUP } from "../../const";

interface SocketAction {
  connectSocket: (payload: any) => void;
  // handleChatData: (payload: any) => void;
}

export type SocketStore = SocketState & SocketAction;

export const useSocketStore = create<SocketStore>((set, get) => ({
  ...socketState,
  connectSocket: async (payload) => {
    let user = useAppStore.getState().user;
    // 初始化 socket 连接
    let socket = io(`/?userId=${user.userId}`, { reconnection: true });

    socket.on("connect", async () => {
      console.log("连接成功");

      // 获取聊天室所需所有信息
      socket.emit("chatData", user);

      // 先保存好socket对象
      set({ socket });
    });

    socket.on("activeGroupUser", (data: any) => {
      console.log("activeGroupUser", data);
      useChatStore.getState().setActiveGroupUser(data.data);
    });

    socket.on("addGroup", (res: ServerRes) => {
      console.log("on addGroup", res);
      if (res.code) {
        message.error(res.msg);
      }
      message.success(res.msg);
      useChatStore.getState().setGroupGather(res.data);
    });

    socket.on("joinGroup", async (res: ServerRes) => {
      console.log("on joinGroup", res);
      if (res.code) {
        message.error(res.msg);
      }
      let newUser = res.data.user;
      let group = res.data.group;
      if (newUser.userId !== user.userId) {
        useChatStore.getState().setUserGather(newUser);
        message.info(`${newUser.username}加入群${group.groupName}`);
      } else {
        console.log(useChatStore.getState().groupGather, group.groupId);
        // 是用户自己 则加入到某个群
        if (!useChatStore.getState().groupGather[group.groupId]) {
          useChatStore.getState().setGroupGather(group);
          // 获取群里面所有用户的用户信息
          socket.emit("chatData", user);
        }
        message.info(`成功加入群${group.groupName}`);
        useChatStore
          .getState()
          .setActiveRoom(
            useChatStore.getState().groupGather[group.groupId] as Friend & Group
          );
      }
    });

    socket.on("joinGroupSocket", (res: ServerRes) => {
      console.log("on joinGroupSocket", res);
      if (res.code) {
        message.error(res.msg);
      }
      let newUser: Friend = res.data.user;
      let group: Group = res.data.group;
      let friendGather = useChatStore.getState().friendGather;
      if (newUser.userId === user.userId) {
        useChatStore.getState().setUserGather(newUser as User);
        if (friendGather[newUser.userId]) {
          let messages;
          if (friendGather[newUser.userId].messages) {
            messages = friendGather[newUser.userId].messages;
          }
          useChatStore.getState().setFriendGather(newUser as User);
          if (messages) {
            useChatStore.getState().setFriendMessages(messages);
          }
        }
        // @ts-ignore 解决重复进群消息问题
        if (window.msg === newUser.userId) {
          return;
        }
        // @ts-ignore
        window.msg = newUser.userId;
        message.info(`${newUser.username}加入群${group.groupName}`);
      } else {
        if (!useChatStore.getState().groupGather[group.groupId]) {
          useChatStore.getState().setGroupGather(group);
        }
        useChatStore.getState().setUserGather(newUser as User);
      }
    });

    socket.on("groupMessage", (res: ServerRes) => {
      console.log("on groupMessage", res);
      if (res.code) {
        message.error(res.msg);
      } else {
        let groupMessage = res.data;
        useChatStore.getState().setGroupMessages(groupMessage);
        let activeRoom = useChatStore.getState().activeRoom;
        if (activeRoom?.groupId !== groupMessage.groupId) {
          useChatStore.getState().addUnreadGather(groupMessage);
        }
      }
    });

    socket.on("addFriend", (res: ServerRes) => {
      console.log("on addFriend", res);
      if (res.code) {
        message.error(res.msg);
      } else {
        useChatStore.getState().setFriendGather(res.data);
        useChatStore.getState().setUserGather(res.data);
        message.info(res.msg);
        socket.emit("joinFriendSocket", {
          userId: user.userId,
          friendId: res.data.userId,
        });
      }
    });

    socket.on("joinFriendSocket", (res: ServerRes) => {
      console.log("on joinFriendSocket", res);
      if (!res.code) {
        console.log("成功加入私聊房间");
      }
    });

    socket.on("friendMessage", (res: ServerRes) => {
      console.log("on friendMessage", res);
      if (!res.code) {
        if (
          res.data.friendId === user.userId ||
          res.data.userId === user.userId
        ) {
          console.log("ADD_FRIEND_MESSAGE", res.data);
          useChatStore.getState().addFriendMessage(res.data);
          let activeRoom = useChatStore.getState().activeRoom;
          if (
            activeRoom?.userId !== res.data.userId &&
            activeRoom?.userId !== res.data.friendId
          ) {
            useChatStore.getState().addUnreadGather(res.data.userId);
          }
        }
      } else {
        message.error(res.msg);
      }
    });

    socket.on("chatData", (res: ServerRes) => {
      if (res.code) {
        return message.error(res.msg);
      } else {
        let user = useAppStore.getState().user;
        let socket = get().socket;
        let groupGather = useChatStore.getState().groupGather;
        let groupArr = res.data.groupArr;
        let friendArr = res.data.friendArr;
        let userArr = res.data.userArr;
        if (groupArr && groupArr.length) {
          for (const group of groupArr) {
            socket?.emit("joinGroupSocket", {
              groupId: group.groupId,
              userId: user.userId,
            });
            useChatStore.getState().setGroupGather(group);
          }
        }
        if (friendArr && friendArr.length) {
          for (const friend of friendArr) {
            socket?.emit("joinFriendSocket", {
              userId: user.userId,
              friendId: friend.userId,
            });
            useChatStore.getState().setFriendGather(friend);
          }
        }
        if (userArr && userArr.length) {
          for (const user of userArr) {
            useChatStore.getState().setUserGather(user);
          }
        }

        let activeRoom = useChatStore.getState().activeRoom;
        let groupGather2 = useChatStore.getState().groupGather;
        let friendGather2 = useChatStore.getState().friendGather;

        if (!activeRoom) {
          useChatStore
            .getState()
            .setActiveRoom(groupGather[DEFAULT_GROUP] as Friend & Group);
        }

        useChatStore
          .getState()
          .setActiveRoom(
            (groupGather2[activeRoom!.groupId] ||
              friendGather2[activeRoom!.userId]) as Friend & Group
          );
        useChatStore.getState().setDropped(false);
      }
    });

    socket.on("exitGroup", (res: ServerRes) => {
      if (!res.code) {
        useChatStore.getState().deleteGroup(res.data);
        useChatStore
          .getState()
          .setActiveRoom(
            useChatStore.getState().groupGather[DEFAULT_GROUP] as Friend & Group
          );
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });

    socket.on("exitFriend", (res: ServerRes) => {
      if (!res.code) {
        useChatStore.getState().deleteFriend(res.data);
        useChatStore
          .getState()
          .setActiveRoom(
            useChatStore.getState().groupGather[DEFAULT_GROUP] as Friend & Group
          );
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  },
}));
