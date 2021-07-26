import Toast from "./Toast";
//吐司封装
const obj ={
install(Vue) {
  //1.创建组件构造器,install有默认参数
   const toastContrustor = Vue.extend(Toast)
  //2.new 的方式，根据组建构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  //3.将组建对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
}
export default obj
