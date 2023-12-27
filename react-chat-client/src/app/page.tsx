"use client";
import LeftToolBar from "../../components/LeftToolBar";
import styles from "./page.module.scss";

export default function Chat() {
  return (
    <div className={styles["chat"]}>
      <div className={styles["chat-part1"]}>
        <LeftToolBar />
      </div>
    </div>
  );
}
