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

// https://github.com/umijs/umi-request#middleware
import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data.d';

// 请求错误处理
const errorHandler = function (error: any) {
  // const codeMap = {
  //   '021': 'An error has occurred',
  //   '022': 'It’s a big mistake,',
  //   // ....
  // };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status > 400) {
      message.error(error.data.message || error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    // console.log(error.message);s
    message.error('网络繁忙、请稍后重试');
  }
  throw error; // If throw. The error will continue to be thrown.
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
const extendRequest = extend({ errorHandler });

export const getRemoteList = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  // return request('http://public-api-v1.aspirantzhang.com/users', {
  return extendRequest(`api/users?page=${page}&per_page=${per_page}`, {
    // return extendRequest(`api/users`, {
    method: 'get',
  })
    .then(function (response) {
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      // console.log(error);
      return false;
    });
};

export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return extendRequest(`api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function (response) {
      console.log('编辑成功');
      return true;
      // message.success('编辑成功');
    })
    .catch(function (error) {
      console.log('编辑错误');
      // message.error('编辑失败');
      return false;
    });
};

export const addRecord = async ({ values }: { values: FormValues }) => {
  return extendRequest(`api/users`, {
    method: 'post',
    data: values,
  })
    .then(function (response) {
      console.log('ok');
      return true;
      // message.success('新增成功');
    })
    .catch(function (error) {
      console.log(error);
      // message.error('新增失败');
      return false;
    });
};

export const deleteRecord = async ({ id }: { id: number }) => {
  return extendRequest(`api/users/${id}`, {
    method: 'delete',
  })
    .then(function (response) {
      console.log('ok');
      // message.success('删除成功');
      return true;
    })
    .catch(function (error) {
      console.log(error);
      // message.error('删除失败');
      return false;
    });
};
