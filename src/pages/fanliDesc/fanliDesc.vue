<template>
  <article class="yu-e-wrapper">
    <x-header :left-options="{backText: ''}">余额明细</x-header>
    <section class="desc-wrapper">
      <img src="../../assets/images/12a@2x.png">
      <div class="price-wrapper">
        <div class="desc">
          <p class="dot">￥<span>{{money}}</span></p>
          <button @click="tiXian">提现</button>
        </div>
        <div class="text">
          <p>可用返利</p>
          <!-- <p>查看返利</p> -->
        </div>
      </div>
    </section>

    <section class="content-wrapper">
      <div class="title">
        <p :class="{active: !fanli}" @click="aleady">已返返利</p>
        <p :class="{active: fanli}" @click="wait">待返返利</p>
      </div>
      <div class="content">
        <p class="amount" v-if="!fanli">
          已返{{already.length}}期
        </p>
        <p class="amount" v-else>
          待返{{waits.length}}期
        </p>
        <ul class="desc" v-if="!fanli">
          <div v-for="(list, index) in already" :key="index" class="container">
            <li>
              <p class="num">{{index + 1}}</p>
              <div class="date-price">
                <p>{{list.rebate_at | moment}}</p>
                <p>待返 {{list.rebateMoney}} 元</p>
              </div>
            </li>
            <div class="left-border"></div>
          </div>
        </ul>
        <ul class="desc" v-else>
          <div v-for="(list, index) in waits" :key="index" class="container">
            <li>
              <p class="num">{{index + 1}}</p>
              <div class="date-price">
                <p>{{list.rebate_at | moment}}</p>
                <p>待返 {{list.rebateMoney}} 元</p>
              </div>
            </li>
            <div class="left-border"></div>
          </div>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import { XHeader } from 'vux'
import {getRebateLogList} from '@/api/index'
export default {
  data() {
    return {
      fanli: false,
      lists: [
        {date: '2018-08-08', num: '已返400元'},
        {date: '2018-07-08', num: '已返400+500元'},
        {date: '2018-06-08', num: '已返400+500元'},
        {date: '2018-05-08', num: '已返400+500元'}
      ],
      money: 0,
      rebateLogs: [],
      already: [],
      waits: []
    }
  },
  mounted() {
    this._getRebateLogList()
  },
  methods: {
    aleady() {
      this.fanli = false
    },
    wait() {
      this.fanli = true
    },
    tiXian() {
      this.$router.push('/applyMoney')
    },
    async _getRebateLogList() {
      await getRebateLogList({id: localStorage.getItem('id')}).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.money = res.data.data.rebate.toFixed(2)
          this.rebateLogs = res.data.data.rebateLogs
          this.rebateLogs.forEach((item) => {
            console.log(item.rebateMoney)
            item.rebateMoney = item.rebateMoney.split(',')
            item.rebateMoney = item.rebateMoney.join(' + ')
            if (!item.finish) {
              this.waits.push(item)
            } else {
              this.already.push(item)
            }
          })
          console.log(this.waits, 'wait')
          console.log(this.already, 'already')
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
    padding: 0 .426667rem .626667rem .426667rem;
    box-sizing: border-box;
    background: white;
    border-radius: .16rem;
    .title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: .64rem;
      height: 1.173333rem;
      line-height: 1.106667rem;
      box-sizing: border-box;
      font-size: .373333rem;
      color: #231815;
      font-family: PingFang-SC-Bold;
      .active {
        color: #EE681F;
        border-bottom: .066667rem solid #EE681F;
      }
    }
    .content {
      .amount {
        margin-bottom: .426667rem;
        line-height: 1;
        font-size: .373333rem;
        color: #231815;
      }
      .desc {
        li {
          display: flex;
          align-items: center;
          height: .56rem;
          font-size: .373333rem;
          color: #55504F;
          .num {
            margin-right: .266667rem;
            width: .56rem;
            height: .56rem;
            line-height:  .56rem;
            border: .026667rem solid #EE681F;
            border-radius: 50%;
            text-align: center;
            color: #EE681F;
          }
          .date-price {
            display: flex;
            justify-content: space-between;
            width: 100%;
            p:first-of-type {
              flex: 0 0 2.213333rem /* 166/75 */;
            }
            p:last-of-type {
              flex: 0 0 4rem /* 300/75 */;
              white-space: pre-wrap;
              width: 4rem /* 300/75 */;
              text-align: right;
            }
          }
        }
        .left-border {
          margin-left: .266667rem;
          height: .666667rem;
          border-left: .026667rem solid #EE681F;
        }
        .container:last-of-type>.left-border {
          display: none;
        }
      }
    }
  }
}
</style>
