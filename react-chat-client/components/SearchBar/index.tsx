import Icon, { PlusCircleOutlined } from "@ant-design/icons";
import { Select, Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import {
  friendGatherSelector,
  groupGatherSelector,
  useChatStore,
} from "../../store/chat";
import styles from "./index.module.scss";
import { Group } from "antd/es/avatar";
import AddGroupModal from "./AddGroupModal";
import SearchGroupModal from "./SearchGroupModal";
import AddFriendModal from "./AddFriendModal";

const SearchBar = () => {
  const groupGather = useChatStore(groupGatherSelector);
  const friendGahter = useChatStore(friendGatherSelector);
  const [searchData, setSearchData] = useState<Array<Group | Friend>>([]);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" onClick={() => setShowAddGroup(true)}>
          创建群
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" onClick={() => setShowJoinGroup(true)}>
          搜索群
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" onClick={() => setShowAddFriend(true)}>
          搜索用户
        </a>
      ),
    },
  ];

  useEffect(() => {
    setSearchData([
      ...Object.values(groupGather),
      ...Object.values(friendGahter),
    ]);
  }, [groupGather, friendGahter]);

  return (
    <div className={styles["search"]}>
      <div className={styles["search-select"]}>
        <Select
          showSearch
          placeholder="搜索聊天组"
          className={styles["search-select-input"]}
          defaultActiveFirstOption={false}
          filterOption={false}
          notFoundContent={null}
        />
        <Dropdown
          className={styles["search-dropdown"]}
          menu={{ items }}
          placement="bottom"
        >
          <PlusCircleOutlined />
        </Dropdown>
      </div>

      <AddGroupModal
        showAddGroup={showAddGroup}
        onCancel={() => setShowAddGroup(false)}
      />

      <SearchGroupModal
        showJoinGroup={showJoinGroup}
        onCancel={() => setShowJoinGroup(false)}
      />

      <AddFriendModal
        showAddFriend={showAddFriend}
        onCancel={() => setShowAddFriend(false)}
      />
    </div>
  );
};

export default SearchBar;
