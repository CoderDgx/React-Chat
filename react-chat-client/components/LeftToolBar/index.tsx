"use client";
import { backgroundSelector, useAppStore, userSelector } from "../../store/app";
import styles from "./index.module.scss";
import {
  Avatar,
  Button,
  Input,
  Modal,
  Space,
  Tooltip,
  Upload,
  Image,
  Row,
  Col,
  Form,
} from "antd";
import {
  BulbOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  PoweroffOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import BackgroundModal from "./BackgroundModal";
import UserModal from "./UserModal";

const LeftToolBar = () => {
  const user = useAppStore(userSelector);
  const background = useAppStore(backgroundSelector);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  return (
    <div className={styles["tool"]}>
      <div
        className={styles["tool-avatar"]}
        onClick={() => setShowUserModal(true)}
      >
        <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        <div className={styles["tool-avatar-name"]}>Ant Design</div>
      </div>
      <Space direction="vertical" size={30}>
        <BulbOutlined className={styles["icon"]} />
        <SkinOutlined
          className={styles["icon"]}
          onClick={() => setShowBackgroundModal(true)}
        />
        <a
          href="https://github.com/CoderDgx/react-chat"
          target="_blank"
          className={`${styles["tool-github"]} ${styles["icon"]}`}
        >
          <GithubOutlined />
        </a>
        <PoweroffOutlined className={styles["icon"]} />
      </Space>
      <UserModal
        showUserModal={showUserModal}
        onCancel={() => setShowUserModal(false)}
        onFinished={(value) => console.log(value)}
        user={user}
      />
      <BackgroundModal
        showBackgroundModal={showBackgroundModal}
        background={background}
        onCancel={() => setShowBackgroundModal(false)}
        onFinished={(value) => console.log(value)}
      />
    </div>
  );
};

export default LeftToolBar;
