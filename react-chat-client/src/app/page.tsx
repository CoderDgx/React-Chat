"use client";
import { useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import LeftToolBar from "../../components/LeftToolBar";
import MessageWindow from "../../components/MessageWindow";
import SearchBar from "../../components/SearchBar";
import { activeRoomSelector, useChatStore } from "../../store/chat";
import styles from "./page.module.scss";
import RegisterAndLoginModal from "../../components/RegisterAndLoginModal";
import { useAppStore, userSelector } from "../../store/app";

export default function Chat() {
  const user = useAppStore(userSelector);
  const activeRoom = useChatStore(activeRoomSelector);
  const [showRegisterAndLoginModal, setShowRegisterAndLoginModal] =
    useState(false);
  useEffect(() => {
    if (!user.userId) {
      setShowRegisterAndLoginModal(true);
    }
  }, [user]);
  return (
    <div className={styles["chat"]}>
      <div className={styles["chat-part1"]}>
        <LeftToolBar />
      </div>
      <div className={styles["chat-part2"]}>
        <SearchBar />
        <ChatList />
      </div>
      <div className={styles["chat-part3"]}>
        <MessageWindow />
      </div>
      <RegisterAndLoginModal visible={showRegisterAndLoginModal} />
    </div>
  );
}
