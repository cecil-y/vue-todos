<template>
    <!-- 最外层容器 -->
    <div class='page list-show'>
        <!-- 容器上半部分 -->
        <nav>
            <!-- 移动端的菜单图标 -->
            <div class='nav-group'>
                <a class='nav-item'>
                    <span class='icon-list-unordered'></span>
                </a>
            </div>
            <h1 class='title-page'>
                <!-- 标题 -->
                <span class='title-wrapper'>{{ todo.title }}</span>
                <!-- 数目 -->
                <span class='count-list'>{{ todo.count }}</span>
            </h1>
            <!-- 右边的删除，锁定图标容器 -->
            <div class='nav-group right'>
                <div class='options-web'>
                    <a class='nav-item'>
                        <!-- 锁定图标 -->
                        <span class='icon-lock' v-if='todo.locked'></span>
                        <span class='icon-unlock' else></span>
                    </a>
                    <a class='nav-item'>
                        <!-- 删除图标 -->
                        <span class='icon-trash'></span>
                    </a>
                </div>
            </div>

            <!-- 新增单个待办单项输入框，监听了回车事件，双向绑定text值，监听了disabled属性 -->
            <div class='form todo-new input-symbol'>
                <!-- 绑定disabled值，当todo.locked为绑定的时候，禁止input输入 -->
                <!-- <input type='text' v-model='text' placeholder='请输入' @keyup.enter='onAdd' :disabled='todo.locked'/> -->
                <input type='text' v-model='text' placeholder='请输入' :disabled='todo.locked'/>
                <span class='icon-add' ></span>
            </div>
        </nav>
        <!-- 容器下半部分 -->
        <div class='content-scrollable list-items'>
        </div>
    </div>
</template>

<script>
import item from "./item";
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
      text: ""
    };
  },
  methods: {
    // // 当用户点击回车时，给items的值新增一个对象，this.text即输入框绑定的值
    // onAdd() {
    //   this.items.push({
    //     checked: false,
    //     text: this.text,
    //     isDelete: false
    //   });
    //   // 初始化输入的值
    //   this.text = "";
    // }
  }
};
</script>
<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
