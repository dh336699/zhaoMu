<template lang="html">
  <div class="layout">
    <router-view></router-view>

    <tabbar v-if="isShowTabBar">
      <tabbar-item :selected="currentUri === '/'" link="/">
        <img slot="icon" src="../assets/store.png">
        <img slot="icon-active" src="../assets/store-selected.png">
        <span slot="label">商城</span>
      </tabbar-item>
      <tabbar-item :selected="currentUri === '/classify'" link="/classify">
        <img slot="icon" src="../assets/classify.png">
        <img slot="icon-active" src="../assets/classify-selected.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item :selected="currentUri === '/shopcar'" link="/shopcar">
        <img slot="icon" src="../assets/shopcar.png">
        <img slot="icon-active" src="../assets/shopcar-selected.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :selected="currentUri === '/mine'" link="/mine">
        <img slot="icon" src="../assets/mine.png">
        <img slot="icon-active" src="../assets/mine-selected.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  data () {
    return {

    }
  },
  computed: {
    currentUri () {
      return this.$route.path
    },
    isShowTabBar () {
      const path = this.$route.path
      if (path === '/' || path === '/classify' || path === '/shopcar' || path === '/mine') {
        return true
      }
      return false
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
.weui-tabbar {
  position: fixed !important;
  background-color: #ffffff !important;
}
.weui-tabbar__item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1.28rem;
  .weui-tabbar__label {
    font-size: .29rem;
  }
}
.weui-bar__item_on {
  .weui-tabbar__label {
    color: #CD181E !important;
    font-size: .29rem;
  }
}
.weui-tabbar__icon {
  height: .51rem !important;
  img {
    width: auto !important;
  }
}
</style>
