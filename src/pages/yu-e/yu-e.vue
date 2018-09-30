<template>
  <article class="yu-e-wrapper">
    <x-header :left-options="{backText: ''}">余额明细</x-header>
    <section class="desc-wrapper">
      <img src="../../assets/images/12a@2x.png">
      <div class="price-wrapper">
        <div class="desc">
          <p class="dot">￥<span>{{users.balance}}</span></p>
          <button @click="chong">充值</button>
        </div>
        <div class="text">
          <p>我的余额</p>
          <p @click="fanliDesc">查看返利</p>
        </div>
      </div>
    </section>

    <section class="content-wrapper">
      <p class="title">
        余额明细
      </p>
      <div class="detail-wrapper" v-for="item in arrayList" :key="item.id">
        <p class="common-wrapper">
          <span class="left" v-if="item.type === 1">充值</span>
          <span class="left" v-else-if="item.type === 2">返利</span>
          <span class="left" v-else-if="item.type === 3">消费</span>
          <span class="left" v-else>提现</span>
          <span class="right" :class="{active: item.type === 1 || item.type === 2}" v-if="item.type === 1">+{{item.detail}}</span>
          <span class="right" :class="{active: item.type === 1 || item.type === 2}" v-else-if="item.type === 2">+{{item.detail}}</span>
          <span class="right" v-else>-{{item.detail}}</span>
        </p>
         <p class="common-wrapper">
          <span class="time">{{item.creatAt | moment1}}</span>
          <span class="result" v-if="item.type === 4 && !item.finish">审核中</span>
          <span class="result" v-else-if="item.type === 4 && item.finish === 2">审核失败</span>
          <span class="result" v-else-if="item.type === 4 && item.finish === 1">已完成</span>
        </p>
      </div>
    </section>
  </article>
</template>

<script>
import { XHeader } from 'vux'
import {getUserLogList, queryBalance} from '@/api/index'
export default {
  data() {
    return {
      card: false,
      arrayList: [],
      balance: '',
      users: {}
    }
  },
  mounted() {
    this.balance = this.$route.query.balance
    this._getUserLogList()
    this._queryBalance()
  },
  methods: {
    // const datas = { id: localStorage.getItem('id')}
    chong() {
      // alert('000')
      window.location.href = 'http://wx.sunwithtree.com/chongzhiCard'
    },
    fanliDesc() {
      this.$router.push('/fanliDesc')
    },
    _getUserLogList() {
      getUserLogList({ id: localStorage.getItem('id') }).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.arrayList = res.data.data.arrayList
        }
      })
    },
    async _queryBalance() {
      // let _this = this
      // const datas = {openid: localStorage.getItem('openId')}
        await queryBalance({openid: localStorage.getItem('openId')}).then((res) => {
          console.log(res, '9999999999')
          if (res.data.code === 0) {
            // if (!res.data.data.user.tel) {
            //   _this.$router.push('/register')
            //   return false
            // }
            this.users = res.data.data.user
            this.users.balance = res.data.data.user.balance.toFixed(2)
          }
        })
      }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
.yu-e-wrapper {
  position: relative;
  .desc-wrapper {
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 3.466667rem;
    }
    .price-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3.466667rem;
      .desc {
        margin: .506667rem .413333rem 0 .413333rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #FFFFFF;
        line-height: 1;
        .dot {
          font-size: .48rem;
          span {
            font-size: .853333rem;
          }
        }
        button {
          width: 2.133333rem;
          height: .8rem;
          background: #F65C2B;
          color: white;
          font-size: .373333rem;
          border-radius: .4rem;
        }
      }
      .text {
        display: flex;
        justify-content: space-between;
        margin: .426667rem .76rem 0 .533333rem;
        font-size: .373333rem;
        color: white;
        line-height: 1;
      }
    }
  }
  .content-wrapper {
    position: absolute;
    top: 3.866667rem;
    left: .413333rem;
    right: .413333rem;
    padding: 0 0 .626667rem .426667rem;
    box-sizing: border-box;
    background: white;
    border-radius: .16rem;
    .title {
      padding-right: .426667rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      font-size: .373333rem;
      color: #231815;
      font-weight: PingFang-SC-Bold;
      border-bottom:@border-bottom;
    }
    .detail-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 1.6rem;
      border-bottom: @border-bottom;
      padding-right: @padding-right;
      .common-wrapper {
        display: flex;
        justify-content: space-between;
        font-size: .373333rem;
        .left {
          color: #55504F;
        }
        .right {
          color:#C41F21;
           &.active {
            color: #0DADBB;
          }
        }
        .time {
          color: #B6B2B0;
        }
        .result {
          color:#231815;
        }
      }
    }
  }
}
</style>
