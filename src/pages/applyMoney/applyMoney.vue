<template>
  <article class="bank-card-wrapper">
    <section v-if="!arrayList.length">
      <x-header :left-options="{backText: ''}">提现</x-header>
      <p class="add-bank-card" v-if="card">还未添加银行卡</p>
      <ul class="bank-card-lists" @click="addBankCard">
        <li class="bank-card">
          <img class="bg" src="../../assets/images/13d@2x.png">
          <div class="card-info">
            <p>提到银行卡</p>
            <span>您还未添加到银行卡，去添加</span>
          </div>
          <img class="right-icon" src="../../assets/images/13b@2x.png">
        </li>
      </ul>
      <div class="money-num">
        <p>提现金额</p>
        <input type="number" placeholder="请输入提现金额">
      </div>
      <div style="text-align: center">
        <a class="btn" @click="next">确认提现</a>
      </div>
    </section>

    <section v-else>
      <x-header :left-options="{backText: ''}">提现</x-header>
      <p class="add-bank-card" v-if="card">还未添加银行卡</p>
      <ul class="bank-card-lists" @click="bankCard">
        <li class="bank-card">
          <img class="bg" src="../../assets/images/13a@2x.png">
          <div class="card-info2">
            <p class="title">提到银行卡</p>
            <p class="bank-name">{{arrayList[0].bankName}}</p>
            <span class="card">{{arrayList[0].cardNo}}</span>
          </div>
          <img class="right-icon" src="../../assets/images/13b@2x.png">
        </li>
      </ul>
      <div class="money-num">
        <p>提现金额</p>
        <input type="number" placeholder="请输入提现金额" v-model="price">
      </div>
      <p class="desc">可提现金额:{{users.rebate}}元</p>
      <a class="btn active" @click.stop.prevent="next">确认提现</a>
    </section>

    <section class="mask" v-if="confirmTiXian"></section>
    <section class="set-psd" v-if="confirmTiXian">
      <div class="header">
        <div @click="cancle">X</div>
        <p>输入支付密码</p>
      </div>
      <ul class="psd-wrapper" @click="beginInput">
        <li><i v-if="psdText.length > 0"></i></li>
        <li><i v-if="psdText.length > 1"></i></li>
        <li><i v-if="psdText.length > 2"></i></li>
        <li><i v-if="psdText.length > 3"></i></li>
        <li><i v-if="psdText.length > 4"></i></li>
        <li class="last"><i v-if="psdText.length > 5"></i></li>
      </ul>
      <input password v-model="psdText" ref="pwd" type="number" oninput="if(value.length>5)value=value.slice(0,6)"  @input="changePsd" @blur="testPrice"/>
      <p class="forget" @click="forget">忘记密码</p>
      <div class="psd-btn" @click="tiXian">
        确定
      </div>
    </section>
  </article>
</template>

<script>
import { XHeader } from 'vux'
import {queryBrankList, savaReviewed, queryBalance} from '@/api/index'
  export default {
    data() {
      return {
        card: false,
        arrayList: [],
        cardNo: null,
        bankName: null,
        price: null,
        psdText: '',
        isFocus: true,
        confirmTiXian: false,
        users: ''
      }
    },
    mounted() {
      this.cardNo = this.$route.query.cardId
      console.log(this.cardNo)
      this._queryBalance()
      if (!this.cardNo) {
        this._queryBrankList()
      } else {
        this.arrayList = []
        this.bankName = this.$route.query.bankName
        this.arrayList.push({'cardNo': this.cardNo, 'bankName': this.bankName})
        console.log(this.arrayList)
      }
    },
    methods: {
      addBankCard() {
        this.$router.push({path: '/bankCardInfo', query: {isAdd: 1}})
      },
      bankCard() {
        this.$router.push({path: '/bankCard', query: {isAdd: 1}})
      },
      next() {
        let _this = this
         if (!this.price || !this.arrayList.length || this.price === '0') {
          this.$vux.toast.text('请选择银行卡或输入提现金额')
          return false
        } else if (Number(this.price) < 100) {
          this.$vux.toast.show({
              text: '提现金额必须大于100',
              type: 'cancel'
          })
          return false
        } else if (Number(this.users.rebate) < Number(this.price)) {
          this.$vux.toast.show({
              text: '大于可提现金额',
              type: 'cancel'
          })
          return false
        } else if (!this.users.pwd) {
          localStorage.setItem('tiXian', 1)
          this.$vux.toast.show({
              text: '请先设置支付密码',
              type: 'cancel',
              onHide() {
                _this.$router.push({path: '/password1', query: {tiXian: 1}})
              }
          })
          return false
        }
        this.confirmTiXian = true
      },
      forget() {
        this.$router.push('/password1')
      },
      tiXian() {
        let _this = this
        const datas = {userId: Number(localStorage.getItem('id')), pwd: Number(this.psdText), money: Number(this.price), cardId: String(this.arrayList[0].id)}
        console.log(datas)
        savaReviewed(datas).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.$vux.toast.show({
              text: '提现成功',
              onHide() {
                _this.$router.push('/supplySuccess')
              }
            })
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'cancel',
              onHide() {
                _this.confirmTiXian = false
                _this.psdText = ''
              }
            })
          }
        }).catch((ret) => {
          this.$vux.toast.show({
              text: '提现失败',
              type: 'cancel',
              onHide() {
                _this.confirmTiXian = false
                _this.psdText = ''
              }
            })
        })
      },
      beginInput() {
        this.$refs.pwd.focus()
      },
      changePsd() {
        console.log(this.psdText)
        if (!this.psdText.length) {
          return false
        }
      },
      testPrice() {
        if (this.users.balance <= this.price) {
          this.$vux.toast.show({
              text: '大于可提现金额'
          })
          return false
        }
      },
      cancle() {
        this.confirmTiXian = false
      },
      _queryBrankList() {
        queryBrankList({id: localStorage.getItem('id')}).then((res) => {
          console.log(res)
          this.arrayList = res.data.data.arrayList
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
            this.users.rebate = res.data.data.user.rebate.toFixed(2)
            this.users.pwd = res.data.data.user.pwd
          }
        })
      }
    },
    // watch: {
    //   confirmTiXian(ne, old) {
    //     console.log(ne)
    //     if (ne) {
    //       this.beginInput()
    //     }
    //   }
    // },
    components: {
      XHeader
    }
  }
</script>

<style lang='less' scoped>
  @import '../../styles/variables.less';
  .bank-card-wrapper {
    .add-bank-card {
      margin: 1.413333rem auto 0 auto;
      font-size: .426667rem;
      color: #827F7E;
      text-align: center;
    }
    .bank-card-lists {
      margin-top: .426667rem;
      margin-bottom: .666667rem;
      .bank-card {
        position: relative;
        width: 100%;
        text-align: center;
        .bg {
          width: 9.2rem;
          height: 2.666667rem;
        }
        .card-info {
          position: absolute;
          top: .666667rem;
          left: .826667rem;
          text-align: left;
          color: #FFFFFF;
          p {
            margin-bottom: .546667rem;
            font-size: .506667rem;
            line-height: 1;
            color: #231815;
            font-family: PingFang-SC-Bold;
          }
          span {
            font-size: .373333rem;
            line-height: 1;
            color: #55504F;
            font-family: PingFang-SC-Medium;
          }
        }
        .card-info2 {
          position: absolute;
          top: .413333rem;
          left: .826667rem;
          text-align: left;
          color: #FFFFFF;
          .title {
            margin-bottom: .466667rem;
            font-size: .373333rem;
            line-height: 1;
            color: #FFFFFF;
            font-family: PingFang-SC-Bold;
          }
          .bank-name {
            margin-bottom: .306667rem;
            font-size: .48rem;
            line-height: 1;
            color: #FFFFFF;
            font-family: PingFang-SC-Medium;
          }
          span {
            font-size: .373333rem;
            line-height: 1;
            color: #FFFFFF;
            font-family: PingFang-SC-Medium;
          }
        }
        .right-icon {
          position: absolute;
          top: 1.066667rem;
          right: .893333rem;
          width: .28rem;
          height: .493333rem;
        }
      }
    }
    .money-num {
      margin: .666667rem .4rem;
      height: 1.333333rem;
      display: flex;
      align-items: center;
      padding-left: .426667rem;
      font-size: .4rem;
      background: white;
      border-radius: .16rem;
      p {
        flex: 0 0 2.813333rem;
        color: #55504F;
      }
      input {
        color: #B6B2B0;
      }
    }
    .desc {
        display: flex;
        justify-content: center;
        font-size: .373333rem;
        color: #EE681F;
      }
    .btn {
      // position: absolute;
      // left: 50%;
      // bottom: 1.693333rem;
      // transform: translateX(-50%);
      display: block;
      margin: 5.96rem /* 447/75 */ auto 0;
      width: 9.2rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      padding-left: .386667rem;
      padding-right: .4rem;
      background: #D6D0CE;
      color: white;
      font-size: .453333rem;
      text-align: center;
      font-family: PingFang-SC-Regular;
      border-radius: .573333rem;
      &.active {
        background: @background;
      }
    }

    .mask {
      position: fixed;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
      background:rgba(0,0,0,1);
      opacity:0.3;
      z-index: 100;
    }
    .set-psd{
      position: absolute;
      top: 2.626667rem /* 197/75 */;
      left: .813333rem /* 61/75 */;
      right: .813333rem /* 61/75 */;
      padding-top: .8rem /* 60/75 */;
      background: white;
      border-radius: .133333rem /* 10/75 */;
      z-index: 101;
      .header {
        display: flex;
        align-items: center;
        margin-bottom: .64rem;
        font-size: 0;
        div {
          position: absolute;
          top: .266667rem /* 20/75 */;
          left: .32rem /* 24/75 */;
          flex: 0 0 .266667rem /* 20/75 */;
          font-size: .4rem /* 30/75 */;
        }
        p {
          width: 100%;
          text-align: center;
          font-size: .426667rem;
          color: rgb(58, 36, 32);
        }
      }
      .psd-wrapper {
        display: flex;
        justify-content: center;
        height: 1.493333rem;
        li {
          display: block;
          width: 1.2rem /* 90/75 */;
          height: 100%;
          line-height: 1.493333rem;
          background: white;
          border: 1px solid rgb(155, 150, 158);
          border-right: 0 none;
          text-align: center;
          &.last {
            border-right: 1px solid rgb(155, 150, 158);
          }
          i {
            display: inline-block;
            width: .533333rem;
            height: .533333rem;
            transform: translateY(25%);
            border-radius: 50%;
            background: black;
          }
        }
      }
      input {
        text-indent: -999em; /*文本向左缩进*/
        margin-left: -100%; /*输入框光标起始点向左左移*／
        width: 200%; /*输入框增大一倍*/
        opacity: 0;
      }
      .forget {
        text-align: center;
      }
      .psd-btn {
        margin-top: .666667rem /* 50/75 */;
        height: 1.173333rem /* 88/75 */;
        line-height: 1.173333rem /* 88/75 */;
        text-align: center;
        font-size: .453333rem /* 34/75 */;
        color: #C41F21;
        border-top: .013333rem /* 1/75 */ solid #F3EEEB;
      }
    }
  }
</style>
