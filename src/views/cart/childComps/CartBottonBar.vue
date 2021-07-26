<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      :is-checked="isSelectAll"
      class="check-bottom" @click.native="checkClick"/>
    <span>全选</span>
  </div>
  <div class="price">
    合计： {{totalPrice}}
  </div>
  <div class="calculate">
      去计算： {{checkLength}}
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
name: "CartBottonBar",
  components: {
  CheckButton
  },
  computed: {
    totalPrice() {
      return '￥'+ this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue+ item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item =>  item.checked).length
    },
    isSelectAll() {
   // return  !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length===0) return false
     return  !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {//全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }
      else {//不全部选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}
.check-bottom {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;

}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: white;
  background-color: deeppink;
  text-align: center;
}
</style>
