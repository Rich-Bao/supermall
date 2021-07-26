<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center"> 购物车({{cartLength}}) </div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-botton-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import CartList from "./childComps/CartList";
import CartBottonBar from "./childComps/CartBottonBar";

//获取vuex的getters里边的函数，直接转成对应的计算属性
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart {
 height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
