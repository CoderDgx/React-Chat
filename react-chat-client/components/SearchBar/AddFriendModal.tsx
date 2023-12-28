import { Modal, Select, Button } from "antd";
import { FC } from "react";

import styles from "./index.module.scss";

interface AddFriendModalProps {
  showAddFriend: boolean;
  onCancel: () => void;
}

const AddFriendModal:FC<AddFriendModalProps> = (props) => {
  const { showAddFriend, onCancel } = props;
  return (
    <Modal open={showAddFriend} footer="" title="搜索用户" onCancel={onCancel}>
      <div className={styles["search-select"]}>
        <Select
          showSearch
          placeholder="请输入用户名字"
          className={styles["search-select-input"]}
          defaultActiveFirstOption={false}
          filterOption={false}
          notFoundContent={null}
        />
        <Button type="primary" style={{ marginLeft: 10 }}>
          添加好友
        </Button>
      </div>
    </Modal>
  );
};

export default AddFriendModal;
