import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Space,
  Form,
  Tooltip,
  Input,
  Row,
  Col,
  Image,
} from "antd";
import { FC } from "react";
import styles from "./index.module.scss";

const recommendData = [
  {
    url: "https://images.weserv.nl/?url=https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23fa890c0c244db1b2d6e0927113475c~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/800/q/85",
    text: "阿童木",
  },
  {
    url: "https://images.weserv.nl/?url=https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/453b8ebcdefa46a69c620da13f346ce2~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/800/q/85",
    text: "山谷",
  },
  {
    url: "https://pic2.zhimg.com/v2-f76706d67343c66b08c937ec6bc42942_r.jpg?source=1940ef5c",
    text: "云朵",
  },
  {
    url: "https://images.weserv.nl/?url=https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc98cbc4ca284fc0aa509b12db0e325e~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/800/q/85",
    text: "少女",
  },
];

interface BackgroundModalProps {
  showBackgroundModal: boolean;
  background: string | null;
  onCancel: () => void;
  onFinished: (value: any) => void;
}

const BackgroundModal: FC<BackgroundModalProps> = (props) => {
  const { showBackgroundModal, background, onCancel, onFinished } = props;
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.setFieldValue("background", background);
    onCancel();
  }
  return (
    <Modal
      title="主题"
      open={showBackgroundModal}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
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
      <Space direction="vertical">
        <Form form={form} onFinish={onFinished}>
          <Form.Item
            initialValue={background}
            label={
              <Space>
                背景图
                <Tooltip
                  title="输入空格时为默认背景，支持 jpg, png, gif 等格式"
                  arrow={{ pointAtCenter: true }}
                >
                  <ExclamationCircleOutlined />
                </Tooltip>
              </Space>
            }
            name="background"
            rules={[{ required: true, message: "请输入背景图片网址" }]}
          >
            <Input
              className={styles["tool-user-input"]}
              placeholder="请输入背景图片网址"
            />
          </Form.Item>
        </Form>
        <Row gutter={[16, 8]} wrap>
          {recommendData.map((item, index) => {
            return (
              <Col
                key={index}
                span={12}
                style={{ height: 120 }}
                onClick={() => {
                  form.setFieldsValue({ background: item.url });
                }}
              >
                <Image
                  src={item.url}
                  alt=""
                  height={100}
                  width="100%"
                  className={styles["tool-backgroung-img"]}
                  preview={false}
                />
                <span>{item.text}</span>
              </Col>
            );
          })}
        </Row>
      </Space>
    </Modal>
  );
};

export default BackgroundModal;
