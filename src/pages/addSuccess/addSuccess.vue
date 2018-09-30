<template>
  <article class="add-success-wrapper">
    <x-header :left-options="{backText: ''}">我的银行卡</x-header>
    <section class="content-wrapper">
      <img src="../../assets/images/14a@2x.png">
      <p>恭喜您，添加成功~</p>
    </section>
    <a class="btn" @click="back">返回</a>
  </article>
</template>

<script>
import { XHeader } from 'vux'
export default {
  data() {
    return {
      card: false
    }
  },
  methods: {
    back() {
      let isAdd = this.$route.query.isAdd
      this.$router.replace({path: '/bankCard', query: {isAdd: isAdd}})
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
.add-success-wrapper {
  .content-wrapper {
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 5.333333rem;
    }
    p {
      position: absolute;
      top: 3.546667rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: .453333rem;
      color: #FFF38A;
    }
  }
}
.btn {
      position: absolute;
      left: 50%;
      bottom: 5.626667rem;
      transform: translateX(-50%);
      width: 9.2rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      padding-left: .386667rem;
      padding-right: .4rem;
      background: @background;
      color: white;
      font-size: .453333rem;
      text-align: center;
      font-family: PingFang-SC-Regular;
      border-radius: .573333rem;
    }
</style>
