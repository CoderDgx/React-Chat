import { Button, Form, Input, Modal, Radio, RadioChangeEvent } from "antd";
import { FC, useState } from "react";

interface RegisterAndLoginModalProps {
  visible: boolean;
}

const RegisterAndLoginModal: FC<RegisterAndLoginModalProps> = (props) => {
  const { visible } = props;
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form] = Form.useForm();

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  return (
    <Modal open={visible} footer={null} closeIcon={null}>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="login">登录</Radio.Button>
        <Radio.Button value="register">注册</Radio.Button>
      </Radio.Group>
      <Form form={form}>
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
      <Button type="primary">{mode === "login" ? "登录" : "注册"}</Button>
    </Modal>
  );
};

export default RegisterAndLoginModal;
