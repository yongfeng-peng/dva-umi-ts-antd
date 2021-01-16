// export default () => {
//   return <div>user page ok</div>
// }

import React, { useState, FC } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { connect, Dispatch, Loading, UserState } from 'umi'; // UserState自定义的

import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data.d';

// data.d TS中的数据定义规范

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

// rafc
// 两个独立的函数
// const userListPage = ({users, dispatch, userListLoading} : {users: 类型, dispatch: xx, userListLoading: xx}) => {
// 泛型定义
const userListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [record, setRecord] = useState(undefined);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined); // 数据类型定义
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: SingleUserType) => (
        <span>
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            edit
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="确定要删除数据？"
            onConfirm={() => {
              deleteHandler(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    console.log(record);
    setRecord(record);
  };
  const closeHandler = () => {
    setModalVisible(false);
  };
  const onFinish = (values: FormValues) => {
    let id = record ? record.id : undefined;
    if (id) {
      dispatch({
        type: 'users/edit', // 页面触发与model 不一样
        // payload: values
        payload: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: {
          values,
        },
      });
    }
    setModalVisible(false);
  };
  const deleteHandler = (id: number) => {
    // const id = record.id;
    dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  };

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined); // 重置表单
    console.log('set add');
  };

  return (
    <div className="tabel-container ">
      <Button type="primary" onClick={addHandler}>
        add
      </Button>
      <Table
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={userListLoading}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};

// nfn
// const mapStateToProps = (state) => { // 涉及state的解构
// const mapStateToProps = ({loading, router, users}) => { // 涉及state的解构
const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  // 涉及state的解构
  console.log(loading);
  return {
    users,
    userListLoading: loading.models.users,
  };
};

// 涉及到一个简写
// export default connect(({users}) => ({users}))(index);

export default connect(mapStateToProps)(userListPage);
