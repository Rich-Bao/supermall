<template>
  <tab-bar>
    <teb-bar-item path="/home" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </teb-bar-item>
    <teb-bar-item path="/category" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </teb-bar-item>
    <teb-bar-item path="/cart" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </teb-bar-item>
    <teb-bar-item path="/profile" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </teb-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TebBarItem from "components/common/tabbar/TebBarItem.vue";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TebBarItem
  }
}
</script>

<style scoped>

</style>
