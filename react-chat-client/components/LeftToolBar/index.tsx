"use client";
import { useAppStore, userSelector } from "../../store/app";
import styles from "./index.module.scss";
import { Avatar, Button, Input, Modal, Space, Tooltip, Upload } from "antd";
import {
  BulbOutlined,
  GithubOutlined,
  PoweroffOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const LeftToolBar = () => {
  const user = useAppStore(userSelector);
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
      <Modal
        title="编辑用户信息"
        open={showUserModal}
        onCancel={() => setShowUserModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowUserModal(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            保存
          </Button>,
        ]}
      >
        <Space
          className={styles["tool-user"]}
          direction="vertical"
          size="middle"
        >
          <Upload className={styles["tool-user-upload"]} showUploadList={false}>
            <Avatar
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              size={120}
            />
          </Upload>
          <div className={styles["tool-user-info"]}>
            <div className={styles["tool-user-label"]}>用户名：</div>
            <Input
              className={styles["tool-user-input"]}
              placeholder="请输入用户名"
            />
          </div>
          <div className={styles["tool-user-info"]}>
            <div className={styles["tool-user-label"]}>密码：</div>
            <Input.Password
              className={styles["tool-user-input"]}
              placeholder="请输入密码"
            />
          </div>
        </Space>
      </Modal>
      <Modal
        title="主题"
        open={showBackgroundModal}
        onCancel={() => setShowBackgroundModal(false)}
        footer={null}
      >
        <div className={styles["tool-user-info"]}></div>
        <div className={styles["tool-recommend"]}></div>
      </Modal>
    </div>
  );
};

export default LeftToolBar;
