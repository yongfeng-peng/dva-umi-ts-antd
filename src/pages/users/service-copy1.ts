// 异步函数
// async function function_name() {

// }
// const name = async (params) => {

// }

// export const getRemoteList = async (params) => {
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];
//   return data;
// }

import { request } from 'umi';
import { Table, Popconfirm, message } from 'antd';

export const getRemoteList = async (params) => {
  // return request('http://public-api-v1.aspirantzhang.com/users', {
  return request('api/users', {
    method: 'get',
  })
    .then(function (response) {
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editRecord = async ({ id, values }) => {
  return request(`api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function (response) {
      console.log('ok');
      // return response;
      message.success('编辑成功');
    })
    .catch(function (error) {
      console.log(error);
      message.error('编辑失败');
    });
};

export const addRecord = async ({ values }) => {
  return request(`api/users`, {
    method: 'post',
    data: values,
  })
    .then(function (response) {
      console.log('ok');
      // return response;
      message.success('新增成功');
    })
    .catch(function (error) {
      console.log(error);
      message.error('新增失败');
    });
};

export const deleteRecord = async ({ id }) => {
  return request(`api/users/${id}`, {
    method: 'delete',
  })
    .then(function (response) {
      console.log('ok');
      message.success('删除成功');
      // return response;
    })
    .catch(function (error) {
      console.log(error);
      message.error('删除失败');
    });
};
