import { Modal, Input, Button, Form } from "antd";
import { FC } from "react";

interface GroupModalProps {
  showAddGroup: boolean;
  onCancel: () => void;
}

const AddGroupModal: FC<GroupModalProps> = (props) => {
  const { showAddGroup, onCancel } = props;
  const [form] = Form.useForm();
  return (
    <Modal
      open={showAddGroup}
      title="创建群"
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
      <Form form={form}>
        <Form.Item
          label="群名称"
          rules={[{ required: true, message: "请输入群名称" }]}
        >
          <Input placeholder="请输入群名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
