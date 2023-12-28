import { Modal, Select, Button, Space } from "antd";
import { FC } from "react";
import styles from "./index.module.scss";

interface SearchGroupModalProps {
  showJoinGroup: boolean;
  onCancel: () => void;
}

const SearchGroupModal: FC<SearchGroupModalProps> = (props) => {
  const { showJoinGroup, onCancel } = props;
  return (
    <Modal open={showJoinGroup} footer="" title="搜索群" onCancel={onCancel}>
      <div className={styles["search-select"]}>
        <Select
          showSearch
          placeholder="请输入群名字"
          className={styles["search-select-input"]}
          defaultActiveFirstOption={false}
          filterOption={false}
          notFoundContent={null}
        />
        <Button type="primary" style={{ marginLeft: 10 }}>
          加入群
        </Button>
      </div>
    </Modal>
  );
};

export default SearchGroupModal;
