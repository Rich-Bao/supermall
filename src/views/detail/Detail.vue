<template>
<div id="detail">
  <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll"
          @scroll="contentScroll"
          :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @itemImageLoad="itemImageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <!--想要再组件监听点击，必须加上.native原生修饰符-->
  <back-top @click.native="backClick" v-show="isShowBackTop" />
  <detail-bottom-bar @addCart="addToCart"/>
<!--  <toast :message="message" :show="show"/>-->

</div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail"
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from '@/components/content/backTop/BackTop'
import Scroll from "@/components/common/scroll/scroll";
import {itemListenerMixin,backTopMixin} from "common/mixin";
import {debounce} from "../../common/utils";
import {mapActions} from 'vuex'
//import Toast from "../../components/common/toast/Toast";
export default {
  name: "detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    BackTop,
    //Toast
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopy: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      //1.获取顶部图片轮播图片数据
     // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息,进行数据整合，整理到goods类中
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //店铺信息
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then(res=>{
      //console.log(res);
      this.recommends = res.data.list
    })

      //
    this.getThemeTopy=debounce(()=>{
      //业务逻辑在这儿
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
     // console.log(this.themeTopYs);
    },50)


  },
  methods: {
    ...mapActions(['addCart']),//数组形式
    //对象形式
    // ...mapActions({
    //   add: 'addCart'
    // }),
    itemImageLoad(){
      this.$refs.scroll.refresh();
      //防抖
      this.getThemeTopy()
    },
    titleClick(index) {
      //console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      //console.log(position);
      //1.获取y值
      const positionY = -position.y
      //2.positionY 和主题中进行对比
      let length = this.themeTopYs.length
      for(let i =0;i <length;i++){
        if(this.currentIndex!=i &&((i < length-1
          && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )
          ||(i === length-1 && positionY >=this.themeTopYs[i]))){
          this.currentIndex = i
          //console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = positionY>=3000
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品添加到购物车里，
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      //可以使用 mapActions进行映射，将action中addCart函数映射到这里来,很重要
        this.addCart(product).then(res => {
          // this.show=true
          // this.message=res
          // setTimeout(() => {
          //   this.show = false
          //   this.message=''
          // },1500)
          this.$toast.show(res)//将toast封装成了插件。
      })//.then 可以看出是否添加购物车成功
    }
  },
  mounted() {


  },
  deactivated() {
    // 取消home组件事件总线的监听
    this.$bus.$off("itemImageLoad", this.imgListener);
  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
 position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

}
.backTop {

}
</style>
