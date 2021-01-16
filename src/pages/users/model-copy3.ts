import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 定义接口
interface UserModelType {
  namespace: 'users'; // 唯一标识
  state: {}; // 初始值
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users', // 唯一标识
  state: {}, // 初始值
  reducers: {
    // getList(state, action) {
    // getList(state, {type, payLoad}) { // type一般不需要
    getList(state, { payLoad }) {
      return payLoad;
    },
  },
  effects: {
    // getRemote(action, effects) {
    // getRemote({type, payLoad}, {put, call}) {
    *getRemote(action, { put }) {
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
      yield put({
        type: 'getList',
        payLoad: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      // history.listen((location, action) => {
      // 添加return 和官方文档一致
      return history.listen(({ pathname }) => {
        // 对象解构
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
            // payLoad: ''
          });
        }
      });
    },
  },
};

export default UserModel;
