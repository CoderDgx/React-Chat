import { Modal, Button, Space, Upload, Avatar, Input, Form } from "antd";
import styles from "./index.module.scss";
import { FC } from "react";

interface UserModalProps {
  showUserModal: boolean;
  onCancel: () => void;
  onFinished: (value: any) => void;
  user: User;
}

const UserModal: FC<UserModalProps> = (props) => {
  const { showUserModal, onCancel, onFinished, user } = props;
  const [form] = Form.useForm();
  return (
    <Modal
      title="编辑用户信息"
      open={showUserModal}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form.submit();
            onCancel();
          }}
        >
          保存
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinished}>
        <Form.Item name="avatar">
          <Upload className={styles["tool-user-upload"]} showUploadList={false}>
            <Avatar
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              size={120}
            />
          </Upload>
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
