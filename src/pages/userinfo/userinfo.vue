<template>
  <article class="userinfo-wrapper">
    <x-header :left-options="{backText: ''}">个人信息</x-header>
    <section class="common-wrapper">
      <p>头像</p>
      <img class="avatar" :src="users.headimgurl">
    </section>
    <section class="common-wrapper">
      <p>昵称</p>
      <p>{{users.nickname}}</p>
    </section>
    <section class="common-wrapper">
      <p>手机号</p>
      <p>{{users.tel}}</p>
    </section>
    <section class="common-wrapper" @click="password1">
      <p>支付密码</p>
      <img class="right-icon" src="../../assets/images/4b@2x.png">
    </section>
    <section class="common-wrapper" @click="bankCard">
      <p>我的银行卡</p>
      <img class="right-icon" src="../../assets/images/4b@2x.png">
    </section>
  </article>
</template>

<script>
import {queryBalance} from '@/api/index'
import { XHeader } from 'vux'
  export default {
    data() {
      return {
        users: {}
      }
    },
    mounted() {
      this._queryBalance()
    },
    methods: {
      password1() {
        this.$router.push('/password1')
      },
      bankCard() {
        this.$router.push('/bankCard')
      },
      _queryBalance() {
        const datas = {openid: localStorage.getItem('openId')}
        queryBalance(datas).then((res) => {
          console.log(res)
          this.users = res.data.data.user
        })
      }
    },
    components: {
      XHeader
    }
  }
</script>

<style lang='less' scoped>
  .userinfo-wrapper {
    .common-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .133333rem;
      padding-left: .4rem;
      padding-right: .4rem;
      height: 1.173333rem;
      background: white;
      p {
        font-size: .373333rem;
        color: #55504F;
      }
      .avatar {
        width: .96rem;
        height: .96rem;
        border-radius: 50%;
      }
      .right-icon {
        width: .213333rem;
        height: .373333rem;
      }
    }
  }
</style>
