import { useEffect, useState } from "react";
import {
  useChatStore,
  friendGatherSelector,
  groupGatherSelector,
  unReadGatherSelector,
} from "../../store/chat";
import styles from "./index.module.scss";
import { Avatar, Badge } from "antd";
import { parseText } from "../../utils/common";

const ChatList = () => {
  const friendGather = useChatStore(friendGatherSelector);
  const groupGather = useChatStore(groupGatherSelector);
  const unReadGather = useChatStore(unReadGatherSelector);
  const [chatList, setChatList] = useState<Array<Group | Friend>>([]);
  useEffect(() => {
    setChatList([
      ...Object.values(friendGather),
      ...Object.values(groupGather),
    ]);
  }, [friendGather, groupGather]);
  return chatList.length > 0 ? (
    <div>
      {chatList.map((chat, index) => {
        const group = chat as Group;
        const friend = chat as Friend;
        return (
          <div key={`${friend?.userId || group?.groupId} + ${index}`}>
            {group?.groupId ? (
              <div>
                <Badge count={unReadGather[group.groupId]}>
                  <Avatar src="../../assets/group.png" />
                </Badge>
                <div>
                  <div>{group.groupName}</div>
                  {group.messages ? (
                    <div>
                      {group.messages[group.messages.length - 1].messageType ===
                      "text" ? (
                        <span>
                          {parseText(
                            group.messages[group.messages.length - 1].content
                          )}
                        </span>
                      ) : (
                        <div>[图片]</div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>
                <Badge count={unReadGather[friend.userId]}>
                  <Avatar src={friend.avatar} />
                </Badge>
                <div>{friend.username}</div>
                {friend.messages ? (
                  <div>
                    {friend.messages[friend.messages.length - 1].messageType ===
                    "text" ? (
                      <span>
                        {parseText(
                          friend.messages[friend.messages.length - 1].content
                        )}
                      </span>
                    ) : (
                      <div>[图片]</div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ChatList;
