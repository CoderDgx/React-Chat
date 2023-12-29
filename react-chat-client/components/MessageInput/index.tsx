import { Popover, Tabs } from "antd";
import { useChatStore, activeRoomSelector } from "../../store/chat";
import styles from "./index.module.scss";
import MessageEmoji from "../MessageEmoji";

const MessageInput = () => {
  const activeRoom = useChatStore(activeRoomSelector) as Group & Friend;
  return activeRoom ? (
    <div className={styles["message-input"]}>
      <Popover
        placement="topLeft"
        content={
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Emoji",
                children: (
                  <MessageEmoji addEmoji={(emoji) => console.log(emoji)} />
                ),
              },
              {
                key: "2",
                label: "工具",
                children: "Content of Tab Pane 2",
              },
            ]}
          />
        }
      >
        <div className={styles["messagte-tool-icon"]}>😃</div>
      </Popover>
    </div>
  ) : null;
};

export default MessageInput;
