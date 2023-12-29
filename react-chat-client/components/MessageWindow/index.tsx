import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  useChatStore,
  groupGatherSelector,
  friendGatherSelector,
  activeRoomSelector,
  droppedSelector,
  activeGroupUserSelector,
} from "../../store/chat";
import {
  SyncOutlined,
  TeamOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Popconfirm } from "antd";
import MessageInput from "../MessageInput";

const MessageWindow = () => {
  const groupGather = useChatStore(groupGatherSelector);
  const friendGather = useChatStore(friendGatherSelector);
  const activeRoom = useChatStore(activeRoomSelector) as Group & Friend;
  const dropped = useChatStore(droppedSelector);
  const activeGroupUser = useChatStore(activeGroupUserSelector);
  const [chatName, setChatName] = useState("");
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  useEffect(() => {
    if (groupGather[activeRoom?.groupId]) {
      setChatName(groupGather[activeRoom?.groupId]?.groupName);
    } else {
      setChatName(friendGather[activeRoom?.userId]?.username);
    }
  }, [groupGather, friendGather, activeRoom]);
  return (
    <div className={styles["message"]} id="message">
      <div className={styles["message-header"]}>
        <span className={styles["message-header-text"]}>阿童木</span>
        {dropped ? <SyncOutlined spin /> : null}
        {groupGather[activeRoom?.groupId] ? (
          <TeamOutlined
            className={styles["active-button"]}
            onClick={() => setShowGroupInfo(true)}
          />
        ) : (
          <div className={styles["active-button"]}>
            <Popconfirm
              title="确定要删除该好友吗"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
            >
              <UserDeleteOutlined />
            </Popconfirm>
          </div>
        )}
      </div>
      <Drawer
        title="群聊管理"
        placement="right"
        closable={false}
        onClose={() => setShowGroupInfo(false)}
        open={showGroupInfo}
        getContainer={false}
      >
        {activeGroupUser[activeRoom?.groupId] ? (
          <div>
            <div>
              在线人数：
              {Object.keys(activeGroupUser[activeRoom?.groupId]).length}
            </div>
            {Object.keys(activeGroupUser).map((item) => {
              return <div key={item}></div>;
            })}
            <Button danger>退出</Button>
          </div>
        ) : null}
      </Drawer>
      <div className={styles["message-main"]}>
        <div className={styles["message-content"]}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageWindow;
