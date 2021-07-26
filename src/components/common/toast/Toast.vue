<template>
  <div class="toast" v-show="ishow">
    <div >{{message}}</div>
  </div>
</template>

<script>
export default {
name: "Toast",
 data () {
  return {
    message: '',
    ishow: false
  }
 },
  methods: {
    show(res="未添加商品",delay=1500) {
      this.ishow=true
      this.message=res
      setTimeout(() => {
        this.ishow = false
        this.message=''
      },delay)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: white;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.8);
  z-index: 999;
}
</style>
