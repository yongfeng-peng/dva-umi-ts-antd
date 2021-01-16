import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

import { getRemoteList, editRecord, deleteRecord, addRecord } from './service';
import { message } from 'antd';

import { SingleUserType } from './data.d';

// 很多文件使用
// interface SingleUserType {
//   id: number,
//   name: string,
//   email: string,
//   create_time: string,
//   update_time: string,
//   status: number
// }

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

// 定义接口
interface UserModelType {
  namespace: 'users'; // 唯一标识
  // state: {}; // 初始值
  state: UserState; // 初始值
  reducers: {
    // getList: Reducer
    getList: Reducer<UserState>; // 泛型
  };
  effects: {
    getRemote: Effect;
    // edit: Effect,
    delete: Effect;
    // add: Effect,
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users', // 唯一标识
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  }, // 初始值
  reducers: {
    // getList(state, action) {
    // getList(state, {type, payLoad}) { // type一般不需要
    getList(state, { payLoad }) {
      console.log('reducers here');
      return payLoad;
    },
  },
  effects: {
    // getRemote(action, effects) {
    // getRemote({type, payLoad}, {put, call}) {
    // *getRemote(action, {put, call}) {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      // 取后端接口返回数据
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payLoad: data,
          // payLoad: { // 静态数据
          //   data
          // }
        });
      }
    },
    // *edit({ payload: {id, values} }, {put, call, select}) {
    //   const data = yield call(editRecord, { id, values }); // 参数以第二个参数传递
    //   if(data) {
    //     message.success('编辑成功');
    //     // 刷新列表
    //     const { page, per_page } = yield select(
    //       (state: any) => state.users.meta,
    //     );
    //     yield put({
    //       type: 'getRemote',
    //       payload: {
    //         page,
    //         per_page
    //       }
    //     })
    //   } else {
    //     message.error('编辑失败');
    //   }

    // },
    // *add({ payload: { values} }, {put, call, select}) {
    //   const data = yield call(addRecord, { values });
    //   if(data) {
    //     message.success('新增成功');
    //     const { page, per_page } = yield select(
    //       (state: any) => state.users.meta,
    //     );
    //     yield put({
    //       type: 'getRemote',
    //       payload: {
    //         page,
    //         per_page
    //       }
    //     })
    //   } else {
    //     message.error('新增失败');
    //   }
    // },
    *delete({ payload: { id } }, { put, call, select }) {
      console.log('delete', id);
      const data = yield call(deleteRecord, { id });
      if (data) {
        message.success('删除成功');
        const { page, per_page } = yield select(
          (state: any) => state.users.meta,
        );
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('删除失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      // history.listen((location, action) => {
      // 添加return 和官方文档一致
      return history.listen(({ pathname }) => {
        // 对象解构
        if (pathname === '/users') {
          console.log('subscriptions here');
          dispatch({
            type: 'getRemote',
            // payLoad: ''
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModel;
