<template>
  <article class="chongzhi-card-wrapper">
    <x-header :left-options="{backText: ''}">充值</x-header>
    <div>
      <ul class="card-wrapper">
        <li class="card"
        :class="index === cardIndex ? 'active' : 'normal'"
        v-for="(list, index) in arrayList"
        :key="list.num"
        @click="chooseCard(list, index)">充 <span>{{list.rechargeMoney}} </span>送 <span>{{list.rebateMoney}}</span></li>
      </ul>
    </div>
    <a class="btn" @click="chongzhi()">立即充值</a>
  </article>
</template>

<script>
import { XHeader } from 'vux'
import {getRechargeList, payRecharge, gainWx} from '@/api/index'
import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        cardIndex: -1,
        arrayList: [],
        rechargeId: ''
      }
    },
    mounted() {
      this._getRechargeList()
      this._gainWx()
    },
    methods: {
      chooseCard(list, index) {
        if (this.cardIndex !== index) {
          this.cardIndex = index
          this.rechargeId = list.id
        } else {
          this.cardIndex = -1
          this.rechargeId = ''
        }
      },
      chongzhi() {
        if (!this.rechargeId) {
          this.$vux.toast.text('请选择充值卡')
          return
        }
        let _this = this
        const datas = {userId: localStorage.getItem('id'), rechargeId: this.rechargeId, openid: localStorage.getItem('openId')}
        this.$vux.loading.show({
          text: 'Loading'
        })
        payRecharge(datas).then((res) => {
          console.log(res, 'PAY............')
          this.$vux.loading.hide()
          if (res.data.code === 0) {
            // this.$vux.toast.show({
            //   text: '充值成功',
            //   onHide() {
            //     _this.$router.push('/supplySuccess')
            //   }
            // })
            wx.chooseWXPay({
              appId: res.data.data.jsPayResponse.appid,
              timestamp: res.data.data.jsPayResponse.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.data.data.jsPayResponse.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.data.data.jsPayResponse.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: res.data.data.jsPayResponse.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.data.jsPayResponse.paySign, // 支付签名
              success: function(res) {
                _this.$router.push('/chongzhi')
                // 支付成功后的回调函数
                // _this.$vux.toast.show({
                //   text: '充值成功',
                //   onHide() {
                //     _this.$router.push('/chongzhi')
                //   }
                // })
              }
            })
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'cancel',
              onHide() {
                _this.$router.push('/yuE')
              }
            })
          }
        })
      },
      _getRechargeList() {
        getRechargeList().then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.arrayList = res.data.data.arrayList
          }
        })
      },
      _gainWx() {
        // let _this = this
        let currentUrl = window.location.href
        console.log(currentUrl)
        gainWx({
          currentUrl: currentUrl
        }).then((res) => {
          console.log(res, '0000000')
          let info = res.data
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: info.appId, // 必填，公众号的唯一标识
              timestamp: info.timestamp, // 必填，生成签名的时间戳
              nonceStr: info.nonStr, // 必填，生成签名的随机串
              signature: info.signature, // 必填，签名
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            })
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

.chongzhi-card-wrapper {
  .card-wrapper {
    padding: .4rem 0 .4rem .4rem;
    white-space: wrap;
    .card {
      display: inline-block;
      margin-right: .346667rem /* 26/75 */;
      margin-bottom: .4rem;
      width: 4.426667rem /* 332/75 */;
      height: 2.666667rem;
      line-height: 2.666667rem;
      text-align: center;
      font-size: .373333rem /* 28/75 */;
      border-radius: .16rem;
      &.active {
        background-image: url(../../assets/images/10a@2x.png);
        background-size: 4.426667rem /* 332/75 */2.666667rem;
        color: white;
      }
      &.normal {
        vertical-align: bottom;
        background-image: url(../../assets/images/10b@2x.png);
        background-size: 4.426667rem /* 332/75 */2.666667rem;
        color: rgb(183, 16, 29);
      }
      span {
        vertical-align: bottom;
        font-size: .56rem /* 42/75 */
      }
    }
  }
  .btn {
      position: absolute;
      left: 50%;
      bottom: 1.346667rem;
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
}
</style>
