<template>
  <article class="add-success-wrapper">
    <x-header :left-options="{backText: ''}">我的银行卡</x-header>
    <section class="content-wrapper">
      <img src="../../assets/images/14a@2x.png">
      <p>您的提现已成功申请！<br>
      我们收到后会及时审批~</p>
    </section>
    <router-link to="/center" class="btn">返回</router-link>
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
    text-align: center;
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
      text-align: center;
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
