<template>
  <article class="center-wrapper">
    <section class="header">
      <div @click="userInfo">
        <img class="avatar" :src="users.headimgurl">
        <p class="username">{{users.nickname}}</p>
      </div>
      <div class="money" @click="moneyDesc(users.balance)">
        <p>余额</p>
        <div>
          <p>{{users.balance}}元</p>
          <img src="../../assets/images/4a@2x.png">
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import {queryBalance} from '@/api/index'
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
    userInfo() {
      this.$router.push('/userinfo')
    },
    moneyDesc(balance) {
      this.$router.push({path: '/yuE', query: {balance: balance}})
    },
    async _queryBalance() {
      // let _this = this
      // const datas = {openid: localStorage.getItem('openId')}
      await queryBalance({openid: localStorage.getItem('openId')}).then((res) => {
        console.log(res, '9999999999')
        if (res.data.code === 0) {
          localStorage.setItem('id', res.data.data.user.id)
          // if (!res.data.data.user.tel) {
          //   _this.$router.push('/register')
          //   return false
          // }
          this.users = res.data.data.user
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.center-wrapper {
  position: relative;
  background-image: url(../../assets/images/3a@2x.png);
  background-size: 100% 100%;
  min-height: 100%;
  max-width: 100%;
  .header {
    position: absolute;
    top: 1.293333rem;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    text-align: center;
    .avatar {
      margin-bottom: 0.386667rem;
      width: 2.746667rem;
      height: 2.746667rem;
      border: 0.173333rem solid #ff7225;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .username {
      margin-bottom: .653333rem;
      font-size: 0.453333rem;
      color: #231815;
      text-align: center;
      font-family: PingFang-SC-Medium;
    }
    .money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.386667rem;
      height: 1.333333rem;
      padding-left: .453333rem;
      padding-right: .426667rem;
      background: white;
      border-radius: .16rem;
      p {
        display: inline-block;
        vertical-align: middle;
        font-size: .32rem;
        color: #55504F;
      }
      img {
        margin-left: .133333rem /* 10/75 */;
        vertical-align: middle;
        width: .213333rem;
        height: .373333rem;
        transform: rotate(180deg)
      }
    }
  }
}
</style>
