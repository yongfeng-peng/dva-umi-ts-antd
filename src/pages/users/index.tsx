// export default () => {
//   return <div>user page ok</div>
// }

import React, { useState, FC, useRef } from 'react';
import { Table, Popconfirm, Button, Pagination, message } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState, useModel } from 'umi'; // UserState自定义的

import { editRecord, addRecord } from './service';

import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data.d';

interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

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
  // const ref = useRef<ActionType>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const columns: ProColumns<SingleUserType>[] = [
  //   {
  //     title: 'Id',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text: string) => <a>{text}</a>
  //   },
  //   {
  //     title: 'create Time',
  //     dataIndex: 'create_time',
  //     key: 'create_time',
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text: string, record: SingleUserType) => (
  //       <span>
  //         <a onClick={() => { editHandler(record) }}>edit</a>&nbsp;&nbsp;&nbsp;&nbsp;
  //         <Popconfirm
  //           title="确定要删除数据？"
  //           onConfirm={() => {deleteHandler(record.id)}}
  //           okText="确定"
  //           cancelText="取消"
  //         >
  //           <a>Delete</a>
  //         </Popconfirm>
  //       </span>
  //     ),
  //   },
  // ];
  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleUserType) => [
        <a
          onClick={() => {
            editHandler(record);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          title="Are you sure delete this user?"
          onConfirm={() => {
            deleteHandler(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
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
  const onFinish = async (values: FormValues) => {
    setConfirmLoading(true);
    let id = record ? record.id : 0;
    let serviceFun;
    if (id) {
      serviceFun = editRecord;
    } else {
      serviceFun = addRecord;
    }

    const result = await serviceFun({ id, values });
    if (result) {
      setModalVisible(false);
      message.success(`${id === 0 ? 'Add' : 'Edit'} Successfully.`);
      resetHandler();
      setConfirmLoading(false);
    } else {
      setConfirmLoading(false);
      message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`);
    }
    // if(id) {
    //   dispatch({
    //     type: 'users/edit', // 页面触发与model 不一样
    //     // payload: values
    //     payload: {
    //       id,
    //       values
    //     }
    //   })
    // } else {
    //   dispatch({
    //     type: 'users/add',
    //     payload: {
    //       values
    //     }
    //   })
    // }
    // setModalVisible(false);
  };
  const resetHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
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

  // const requestHandler = async ({pageSize, current}) => {
  //   console.log('request', pageSize, current)
  //   const users = await getRemoteList({
  //     page: current,
  //     per_page: pageSize
  //   });
  //   return {
  //     data: users.data,
  //     success: true,
  //     total: users.meta.total
  //   }
  // }

  // const reloadHandler = () => {
  //   ref.current.reload();
  // }

  const paginationHandler = (page: number, pageSize?: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize ? pageSize : users.meta.per_page,
      },
    });
  };

  const pageSizeHandler = (current: number, size: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };

  // dataSource={users.data}
  // request={requestHandler}
  // actionRef={ref}
  const { user } = useModel('user');
  return (
    <div className="tabel-container ">
      {user}
      {/* <Button type="primary" onClick={addHandler}>add</Button>
      <Button onClick={reloadHandler}>reload</Button> */}
      <ProTable
        columns={columns}
        rowKey="id"
        dataSource={users.data}
        loading={userListLoading}
        search={false}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            resetHandler();
          },
          setting: true,
        }}
        headerTitle="User List"
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            Add
          </Button>,
          <Button onClick={resetHandler}>Reload</Button>,
        ]}
      />
      <Pagination
        className="list-page"
        total={users.meta.total}
        onChange={paginationHandler}
        onShowSizeChange={pageSizeHandler}
        current={users.meta.page}
        pageSize={users.meta.per_page}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
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
