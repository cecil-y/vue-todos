<template>
    <!-- 最外层容器 -->
    <div class='list-item editingClass editing'>
        <!-- 自定义的多选框 -->
        <label class='checkbox'>
            <input type='checkbox' v-model='item.checked'>
            <span class='checkbox-custom'></span>
        </label>
        <!-- 绑定item.text -->
        <input type='text' v-model='item.text' placeholder='请输入...'>
        <!-- 删除图标 -->
        <a class='delete-item'>
            <span class='icon-trash'></span>
        </a>
    </div>
</template>

<script>
export default {
  // 子组件显式的用 props 选项声明它期待获得的数据
  // 这里申明 它想要一个叫做 'item' 的数据
  props: ["item"]
};
</script>
<style lang="less">
@import "../common/style/list-items.less";
</style>
