import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

//安装 Vuex 插件
Vue.use(Vuex);

const state = {
    // 待办事项列表数据
    todoList : [],
    // 移动端的时候菜单是否开启
    menuOpen : false
};

// 定义所需的 mutations
const mutations = {
    EDITTODE(state, data){
        //定义名为 EDITTODE 函数作用改变 todoList 的值
        state.todoList = data;
    },
    MENUOPEN(state){
        // 定义名为 MENUOPEN 函数作用改变 menuOpen的值
        state.menuOpen = !state.menOpen;
    }
};

// 创建 store 实例并且导出
export default new Vuex.Store({
    actions, getters, state, mutations
})