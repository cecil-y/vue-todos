<template>
  <!-- 菜单容器 -->
  <!-- 绑定点击事件goList，并且判断当todoId时候 item.id时，文字高亮度 -->
  <div class='list-todos'>
      <!-- 单个菜单容器 -->
      <!-- 绑定class,当items循环中的id等于我们设置的选中todoId时候，就会加上active这个class，这样样式就会发生变化 -->
      <a @click='goList(item.id)' class='list-todo activeListClass list' :class="{'active' : item.id === todoId}" v-for='(item,index) in todoList' :key='index'>
          <!-- 锁的图标 -->
          <span class='icon-lock' v-if='item.locked'></span>
          <!-- 数字 -->
          <span class='count-list' v-if='item.count > 0' > {{ item.count }}</span>
          <!-- 菜单内容   -->
          {{ item.title }}
      </a>
      <!-- 新增菜单 -->
      <a class="link-list-new" @click='addTodoList'>
          <span class='icon-plus'></span>
          新增
      </a>
  </div>
</template>
<script>
//引入封装好的两个接口函数
import { addTodo } from "../api/api";
export default {
  data() {
    return {
      //菜单数据
      items: [],
      //默认选中id
      todoId: "",
      //新增一个状态来判断代办事项的数据
      todoNum: 0
    };
  },
  watch: {
    'todoId'(id) {
      // 监听到用户的点击todoId的变化在跳转路由
      this.$router.push({ name: "todo", params: { id: id } });
    }
  },
  computed: {
    todoList() {
      const number = this.$store.getters.getTodoList.length;
      if (this.$store.getters.getTodoList.length < this.todoNum) {
        this.goList(this.$store.getters.getTodoList[0].id);
      }
      this.todoNum = number;
      //返回 vuex getters.js 定义的 getTodoList 数据
      return this.$store.getters.getTodoList;
    }
  },
  //调用请求菜单列表数据的接口
  created() {
    // getTodoList({}).then(res => {
    //   // 数据都会返回在res.data里面
    //   const TODOS = res.data.todos;
    //   // 把数据赋值给定义的this.items
    //   this.items = TODOS;
    //   // 把菜单数据的默认的第一个对象的id赋值给默认选中的id
    //   this.todoId = TODOS[0].id;
    // });

    // 调用 vuex actions.js 里面的 getTodo 函数
    this.$store.dispatch("getTodo").then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  methods: {
    // 点击菜单时候，替换选中id
    goList(id) {
      this.todoId = id;
    },
    // 点击新增按钮时候，调用 vuex actions.js 里面的 getTodo 函数
    addTodoList() {
      addTodo({}).then(data => {
        // getTodoList({}).then(res => {
        //   const TODOS = res.data.todos;
        //   this.todoId = TODOS[TODOS.length - 1].id;
        //   this.items = TODOS;
        // });
        this.$store.dispatch("getTodo").then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id);
            }, 100);
          });
        });
      });
    }
  }
};
</script>
<style lang="less">
@import "../common/style/menu.less";
</style>


