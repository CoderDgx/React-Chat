import { FC } from "react";
import styles from "./index.module.scss";

interface MessageEmojiProps {
  addEmoji: (emoji: string) => void;
}

const MessageEmoji: FC<MessageEmojiProps> = (props) => {
  const { addEmoji } = props;
  return (
    <div className={styles["emoji-content"]}>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😃")}>😃</span>
        <span onClick={() => addEmoji("😁")}>😁</span>
        <span onClick={() => addEmoji("😂")}>😂</span>
        <span onClick={() => addEmoji("😄")}>😄</span>
        <span onClick={() => addEmoji("😅")}>😅</span>
        <span onClick={() => addEmoji("😆")}>😆</span>
        <span onClick={() => addEmoji("😇")}>😇</span>
        <span onClick={() => addEmoji("😈")}>😈</span>
        <span onClick={() => addEmoji("😉")}>😉</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😊")}>😊</span>
        <span onClick={() => addEmoji("😋")}>😋</span>
        <span onClick={() => addEmoji("😌")}>😌</span>
        <span onClick={() => addEmoji("😍")}>😍</span>
        <span onClick={() => addEmoji("😎")}>😎</span>
        <span onClick={() => addEmoji("😏")}>😏</span>
        <span onClick={() => addEmoji("😐")}>😐</span>
        <span onClick={() => addEmoji("😑")}>😑</span>
        <span onClick={() => addEmoji("😒")}>😒</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😓")}>😓</span>
        <span onClick={() => addEmoji("😔")}>😔</span>
        <span onClick={() => addEmoji("😕")}>😕</span>
        <span onClick={() => addEmoji("😖")}>😖</span>
        <span onClick={() => addEmoji("😗")}>😗</span>
        <span onClick={() => addEmoji("😘")}>😘</span>
        <span onClick={() => addEmoji("😙")}>😙</span>
        <span onClick={() => addEmoji("😚")}>😚</span>
        <span onClick={() => addEmoji("😛")}>😛</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😜")}>😜</span>
        <span onClick={() => addEmoji("😝")}>😝</span>
        <span onClick={() => addEmoji("😞")}>😞</span>
        <span onClick={() => addEmoji("😟")}>😟</span>
        <span onClick={() => addEmoji("😠")}>😠</span>
        <span onClick={() => addEmoji("😡")}>😡</span>
        <span onClick={() => addEmoji("😢")}>😢</span>
        <span onClick={() => addEmoji("😣")}>😣</span>
        <span onClick={() => addEmoji("😤")}>😤</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😥")}>😥</span>
        <span onClick={() => addEmoji("😦")}>😦</span>
        <span onClick={() => addEmoji("😧")}>😧</span>
        <span onClick={() => addEmoji("😨")}>😨</span>
        <span onClick={() => addEmoji("😩")}>😩</span>
        <span onClick={() => addEmoji("😪")}>😪</span>
        <span onClick={() => addEmoji("😫")}>😫</span>
        <span onClick={() => addEmoji("😬")}>😬</span>
        <span onClick={() => addEmoji("😭")}>😭</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😮")}>😮</span>
        <span onClick={() => addEmoji("😯")}>😯</span>
        <span onClick={() => addEmoji("😰")}>😰</span>
        <span onClick={() => addEmoji("😱")}>😱</span>
        <span onClick={() => addEmoji("😲")}>😲</span>
        <span onClick={() => addEmoji("😳")}>😳</span>
        <span onClick={() => addEmoji("😴")}>😴</span>
        <span onClick={() => addEmoji("😵")}>😵</span>
        <span onClick={() => addEmoji("😶")}>😶</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("😷")}>😷</span>
        <span onClick={() => addEmoji("😸")}>😸</span>
        <span onClick={() => addEmoji("😹")}>😹</span>
        <span onClick={() => addEmoji("😺")}>😺</span>
        <span onClick={() => addEmoji("😻")}>😻</span>
        <span onClick={() => addEmoji("😼")}>😼</span>
        <span onClick={() => addEmoji("😽")}>😽</span>
        <span onClick={() => addEmoji("😾")}>😾</span>
        <span onClick={() => addEmoji("😿")}>😿</span>
      </div>
      <div className={styles["emoji-content-item"]}>
        <span onClick={() => addEmoji("🙀")}>🙀</span>
        <span onClick={() => addEmoji("🙁")}>🙁</span>
        <span onClick={() => addEmoji("🙂")}>🙂</span>
        <span onClick={() => addEmoji("🙃")}>🙃</span>
        <span onClick={() => addEmoji("🙄")}>🙄</span>
        <span onClick={() => addEmoji("🙅")}>🙅</span>
        <span onClick={() => addEmoji("🙆")}>🙆</span>
        <span onClick={() => addEmoji("🙇")}>🙇</span>
        <span onClick={() => addEmoji("🙈")}>🙈</span>
      </div>
    </div>
  );
};

export default MessageEmoji;
