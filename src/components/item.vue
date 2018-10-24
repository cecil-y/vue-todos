<template>
  <transition name='slide-fade'>
    <!-- 最外层容器 -->
    <div class='list-item editingClass editing' :class='{checked: item.checked}' v-show='!item.isDelete'>
        <!-- 自定义的多选框 -->
        <label class='checkbox'>
            <input type='checkbox' v-model='item.checked' name='checked' @change='onChange' :disabled='locked'>
            <span class='checkbox-custom'></span>
        </label>
        <!-- 绑定item.text -->
        <input type='text' v-model='item.text' placeholder='请输入...' :disabled='item.checked || locked' @keyup.enter='onChange'>
        <!-- 删除图标 -->
        <a class='delete-item' v-if='item.checked && !locked' @click='item.isDelete = true; onChange()'>
            <span class='icon-trash'></span>
        </a>
    </div>
  </transition>
</template>

<script>
// item 是 todo 的子组件，他接受一个对象 item 来进行处理
import { editRecord } from "../api/api";
export default {
  // 子组件显式的用 props 选项声明它期待获得的数据
  // 这里申明 它想要一个叫做 'item' 的数据
  //   props: ["item"]
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: "你好，世界"
        };
      }
    },
    'index': {},
    'id': {},
    'init': {},
    'locked': {}
  },
  methods: {
    //用户无论删除修改，锁定都可以利用这个方法
    onChange() {
      editRecord({
        id: this.id,
        record: this.item,
        index: this.index
      }).then(data => {
        this.init();
        this.$store.dispatch("getTodo");
      });
    }
  }
};
</script>
<style lang="less">
@import "../common/style/list-items.less";
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
