<template>
  <!-- 菜单容器 -->
  <!-- 绑定点击事件goList，并且判断当todoId时候 item.id时，文字高亮度 -->
  <div class='list-todos'>
      <!-- 单个菜单容器 -->
      <!-- 绑定class,当items循环中的id等于我们设置的选中todoId时候，就会加上active这个class，这样样式就会发生变化 -->
      <a @click='goList(item.id)' class='list-todo activeListClass list' :class="{'active' : item.id ===todoId}" v-for='item in items'>
          <!-- 锁的图标 -->
          <span class='icon-lock' v-if='item.locked'></span>
          <!-- 数字 -->
          <span class='link-list-new' v-if='item.count > 0' > {{ item.count }}</span>
          <!-- 菜单内容   -->
          {{ item.title }}
      </a>
      <!-- 新增菜单 -->
      <a class="link-list-new">
          <span class='icon-plus'></span>
          新增
      </a>
  </div>
</template>
<script>
//引入封装好的两个接口函数
import { getTodoList, addTodo } from "../api/api";
export default {
  data() {
    return {
      //菜单数据
      items: [],
      //默认选中id
      todoId: ""
    };
  },
  //调用请求菜单列表数据的接口
  created() {
    getTodoList({}).then(res => {
      // 数据都会返回在res.data里面
      const TODOS = res.data.todos;
      // 把数据赋值给定义的this.items
      this.items = TODOS;
      // 把菜单数据的默认的第一个对象的id赋值给默认选中的id
      this.todoId = TODOS[0].id;
    });
  },
  methods: {
    // 点击菜单时候，替换选中id
    goList(id) {
      this.todoId = id;
    },
    addTodoList() {
      // 点击新增按钮时候，调用新增菜单的接口，在接口调用成功再请求数据
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          const TODOS = res.data.todos;
          this.todoId = TODOS[TODOS.length - 1].id;
          this.items = TODOS;
        });
      });
    }
  },
  watch: {
    'todoId'(id) {
      // 监听到用户的点击todoId的变化在跳转路由
      this.$router.push({ name: "todo", params: { id: id } });
    }
  }
};
</script>
<style lang="less">
@import "../common/style/menu.less";
</style>


