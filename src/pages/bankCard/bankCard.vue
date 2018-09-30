<template>
  <article class="bank-card-wrapper">
    <x-header :left-options="{backText: ''}">我的银行卡</x-header>
    <p class="add-bank-card" v-if="!arrayList.length">还未添加银行卡</p>
    <ul class="bank-card-lists" v-else v-for="item in arrayList" :key="item.id">
      <li class="bank-card" @click="isChoose(item)">
        <img src="../../assets/images/6a@2x.png">
        <div class="card-info">
          <p>{{item.bankName}}</p>
          <span>{{item.cardNo}}</span>
        </div>
      </li>
    </ul>
    <a tag="a" class="btn" @click="addBankCard">添加银行卡</a>
  </article>
</template>

<script>
import { XHeader } from 'vux'
import {queryBrankList} from '@/api/index'
  export default {
    data() {
      return {
        card: false,
        arrayList: []
      }
    },
    mounted() {
      this._queryBrankList()
    },
    methods: {
      isChoose(item) {
        let isAdd = this.$route.query.isAdd
        if (!isAdd) {
          return false
        } else {
          this.$router.push({path: '/applyMoney', query: {cardId: item.cardNo, bankName: item.bankName}})
        }
      },
      addBankCard() {
        let isAdd = this.$route.query.isAdd
        this.$router.replace({path: '/bankCardInfo', query: {isAdd: isAdd}})
      },
      _queryBrankList() {
        const datas = {id: localStorage.getItem('id')}
        queryBrankList(datas).then((res) => {
          if (res.data.code === 0) {
            this.arrayList = res.data.data.arrayList
            // console.log(this.arrayList.length)
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
  .bank-card-wrapper {
    min-height: 100%;
    background: #F3EEEB;
    padding-bottom: 1.333333rem /* 100/75 */;
    .add-bank-card {
      margin: 1.413333rem auto 0 auto;
      font-size: .426667rem;
      color: #827F7E;
      text-align: center;
    }
    .bank-card-lists {
      margin-top: .426667rem;
      margin-bottom: .133333rem /* 10/75 */;
      .bank-card {
        position: relative;
        width: 100%;
        text-align: center;
        img {
          width: 9.2rem;
          height: 2.666667rem;
        }
        .card-info {
          position: absolute;
          top: .36rem;
          left: .826667rem;
          text-align: left;
          color: #FFFFFF;
          p {
            font-size: .506667rem;
            font-family: PingFang-SC-Bold;
          }
          span {
            font-size: .373333rem;
            font-family: PingFang-SC-Medium;
          }
        }
      }
    }
    .btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.173333rem;
      line-height: 1.173333rem;
      text-align: center;
      background: #E47342;
      font-size: .453333rem;
      color: #FFFFFF;
    }
  }
</style>
