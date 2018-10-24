<template>
    <!-- 最外层容器 -->
    <div class='page lists-show' v-show='!todo.isDelete'>
        <!-- 容器上半部分 -->
        <nav>
            <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标 -->
            <div class='form list-edit-form' v-show='isUpdate'>
              <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
              <input type="text" v-model='todo.title' @keyup.enter='updateTitle' :disabled='todo.locked'>
              <div class='nav-group right'>
                <a class='nav-item' @click='isUpdate = false'>
                  <span class='icon-close'></span>
                </a>
              </div>
            </div>
            <!-- 移动端的菜单图标 -->
            <div class='nav-group' @click='$store.dispatch("updateMenu")' v-show='!isUpdate'>
                <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
                <a class='nav-item'>
                  <span class='icon-list-unordered'></span>
                </a>
            </div>
            <!-- 显示标题和数字模块 -->
            <h1 class='title-page' v-show='!isUpdate' @click='isUpdate = true'>
                <!-- 标题 -->
                <span class='title-wrapper'>{{ todo.title }}</span>
                <!-- 数目 -->
                <span class='count-list'>{{ todo.count || 0}}</span>
            </h1>
            <!-- 右边的删除，锁定图标容器 -->
            <div class='nav-group right' v-show='!isUpdate'>
                <div class='options-web'>
                    <a class='nav-item' @click='onlock'>
                        <!-- 锁定图标 -->
                        <span class='icon-lock' v-if='todo.locked'></span>
                        <span class='icon-unlock' v-else></span>
                    </a>
                    <a class='nav-item'>
                        <!-- 删除图标 -->
                        <span class='icon-trash' @click='onDelete'></span>
                    </a>
                </div>
            </div>
            <!-- 新增单个待办单项输入框，监听了回车事件，双向绑定text值，监听了disabled属性 -->
            <div class='form todo-new input-symbol'>
                <!-- 绑定disabled值，当todo.locked为绑定的时候，禁止input输入,双向绑定text,和监听input的回车事件@keyup.enter -->
                <input type='text' v-model='text' placeholder='请输入' @keyup.enter='onAdd' :disabled='todo.locked'/>
                <span class='icon-add' ></span>
            </div>
        </nav>
        <!-- 容器下半部分 -->
        <div class='content-scrollable list-items'>
            <div v-for='(item,index) in items'>
                <item :item='item' :index='index' :id='todo.id' :init='init' :locked='todo.locked'></item>
            </div>
        </div>
    </div>
</template>

<script>
import item from "./item";
import { addRecord, getTodo, editTodo } from "../api/api";
export default {
  //   // 新加components对象
  //   components: {
  //     item
  //   },
  data() {
    return {
      todo: {
        // 详情内容
        title: "星期一",
        count: 12,
        locked: false
      },
      // 待办单项列表
      items: [],
      // 新增待办单位绑定的值
      text: "",
      // 新增修改状态
      isUpdate: false
    };
  },
  components: {
    item
  },
  watch: {
    "$route.params.id"() {
      //   监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据
      this.init();
    }
  },
  create() {
    //create 生命周期，在实例已经创建完成，页面还没有渲染时调用init方法
    this.init();
  },
  methods: {
    init() {
      //   获取到 $route下params下的id，即我们在menus.vue组件处传入的数据
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo;
        // 请求成功，拿到res.data.todo;在将record赋值到代办单项列表，其他数据复制到todo对象
        this.items = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        };
      });
    },

    // 当用户点击回车时，给items的值新增一个对象，this.text即输入框绑定的值
    onAdd() {
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text}).then(res => {
        this.text='';
        this.init();
        this.$store.dispatch('getTodo');
      });
      // this.items.push({
      //   checked: false,
      //   text: this.text,
      //   isDelete: false
      // });
      // // 初始化输入的值
      // this.text = "";
    },
    updateTodo(){
      let _this = this;
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch('getTodo');
      });
    },
    updateTitle(){
      this.updateTodo();
      this.isUpdate = false;
    },
    onDelete(){
      this.todo.isDelete = true;
      this.updateTodo();
    },
    onlock(){
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    }

  },
};
</script>
<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
