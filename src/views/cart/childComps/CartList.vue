<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>

</div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "@/components/common/scroll/scroll";
import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);

}

</style>
