// 引入 api 接口函数 getTodoList ,请求最新的待办事项列表数据
import { getTodoList } from '../api/api';

export const getTodo = ({ commit }) => {
    return new Promise((resolve) => {
        getTodoList().then((res) => {
            commit('EDITTODE', res.data.todos);
            resolve();
        })
    })
};

// 定义一个名字为 updateMenu 的事件
export const updateMenu = ({ commit }) => {
    // 调用 store.js 里面的 MENUOPEN 方法
    commit('MENUOPEN');
};