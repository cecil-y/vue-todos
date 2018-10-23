<template>
    <section class='container'> <!-- 最外层容器 -->
        <section class='menu'> <!--左边的容器--> 
            <menus></menus>
        </section>
        <section class='content-container'><!--右边的容器-->
            <todo></todo>
        </section>
    </section>
</template>
<script>
// 导入刚才我们常见的menus组件
import menus from './menus';
import todo from './todo';
export default {
    components : {
        // 注册 menus 组件， 让其可以在template调用
        menus, todo 
    }
};
</script>
<style lang='less'>
@import "../common/style/layouts.less";
</style>
