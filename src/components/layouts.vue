<template>
    <!-- 根据menuOpen的值来判断是否使用menu-open样式 -->
    <section class='container' :class='{"menu-open":menuOpen}'> <!-- 最外层容器 -->
        <section class='menu'> <!--左边的容器--> 
            <menus></menus>
        </section>
        <!-- 这个是当页面收缩覆盖在内容上面的模糊层，点击后复原,他可以直接调用vuex actions.js里面的updateMenu方法 -->
        <div class='content-overlay' @click='$store.dispatch("updateMenu")'></div>
        <div class='content-container'><!--右边的容器-->
            <router-view></router-view>
        </div>
    </section>
</template>
<script>
// 导入刚才我们常见的menus组件
import menus from "./menus";
import todo from "./todo";
export default {
  components: {
    // 注册 menus 组件， 让其可以在template调用
    menus,
    todo
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    }
  }
};
</script>
<style lang='less'>
@import "../common/style/layouts.less";
</style>
