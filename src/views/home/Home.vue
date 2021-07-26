<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick" ref="tabControl1"
      class="tab-control" v-show="isTaboffsetTop"/>
<!-- 不加： 传过去的总是字符串，加：传过去的才是number类型 3-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control  :titles="['流行','新款','精选']"
                     @tabClick="tabClick" ref="tabControl2" />
        <goods-list :goods="showGoods"/>


    </scroll>
<!--    <div>呵呵呵呵</div>-->
<!--    想要再组件监听点击，必须加上.native原生修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>

</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import scroll from "@/components/common/scroll/scroll";
import BackTop from 'components/content/backTop/BackTop'
import {
  getHomeMultidata,
  getHomeGoods
} from "@/network/home";
//import {debounce} from "@/common/utils";
import {itemListenerMixin,backTopMixin} from "common/mixin";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    scroll,
    BackTop
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',

      taboffsetTop: 0,
      isTaboffsetTop: false
    }
  },
  created() {
    //1.请求多个数据，必须写this
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  // activated() {
  //   // 同时刷新better-scroll防止不能滚动
  //   this.$refs.scroll.refresh();
  // },
  // keep-alive状态下离开的时候的生命周期
  // deactivated() {
  //   // 取消home组件事件总线的监听
  //   this.$bus.$off("itemImageLoad", this.imgListener);
  // },
  mounted() {
    // //3.监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh,50)
    // this.$bus.$on('itemImageLoad',() => {
    //   refresh()
    // })
    // //4.获取tabControl的offsetTop
    // //所有组件都有一个属性$el: 用于获取组件中的元素
    // //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop//虽然组件已经挂载完，但图片可能没有加载完，此时的距离不准确
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    contentScroll(position) {
      //1，判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.决定tabControl是否吸顶
      this.isTaboffsetTop =(-position.y) > this.taboffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请问求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //  console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)//数组解构
        this.goods[type].page += 1
        //想要继续进行上拉加载更多，必须进行这一步。
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home {
 height: 100vh;
  position: relative;

}

.home-nav {
  background-color: var(--color-tint);
  color: white;

}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
