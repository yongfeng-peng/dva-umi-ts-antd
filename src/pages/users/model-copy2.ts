import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 定义接口
interface UserModelType {
  namespace: 'users'; // 唯一标识
  state: {}; // 初始值
  reducers: {
    getList: Reducer;
  };
  effects: {};
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users', // 唯一标识
  state: {}, // 初始值
  reducers: {
    getList(state, action) {
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
      return data;
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }, done) {
      // history.listen((location, action) => {
      // 添加return 和官方文档一致
      return history.listen(({ pathname }) => {
        // 对象解构
        if (pathname === '/users') {
          dispatch({
            type: 'getList',
            // payLoad: ''
          });
        }
      });
    },
  },
};

export default UserModel;
