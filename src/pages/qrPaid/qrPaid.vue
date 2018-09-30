<template>
  <article class="qr-paid-wrapper">
      <div class="money-num">
        <p>支付金额</p>
        <input type="number" placeholder="请输入支付金额" v-model="price">
      </div>
      <p class="desc" v-if="!users.balance">可用余额:0元</p>
      <p class="desc" v-else>可用余额:{{users.balance}}元</p>
      <a class="btn active" @click="next">确认支付</a>

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
      <input password v-model="psdText" ref="pwd" type="number" oninput="if(value.length>5)value=value.slice(0,6)"  @input="changePsd"/>
      <p class="forget" @click="forget">忘记密码</p>
      <div class="psd-btn" @click="tiXian">
        确定
      </div>
    </section>
  </article>
</template>

<script>
  import {consumption, getToken, queryBalance} from '@/api/index'
  import config from '@/config/index'
  export default {
    data() {
      return {
        price: '',
        psdText: '',
        isFocus: true,
        confirmTiXian: false,
        users: ''
      }
    },
    mounted() {
      let codeId = this.$route.query.codeId
      if (codeId) {
        localStorage.setItem('codeId', codeId)
      }
      if (localStorage.token) { // 如果有token去重定向页面
        this._queryBalance()
        return false
      } else { // 没有token 去获取code和token
        if (!this.$route.query.code) { // 首次进来没有code 如果没有code，去调微信接口获取code
          this._getCode()
        } else { // 微信重定向回来第二次进来有code，和后台交换token
          this._getToken()
        }
      }
    },
    methods: {
       next() {
         let _this = this
         if (Number(this.users.balance) < Number(this.price)) {
          this.$vux.toast.show({
              text: '小于可支付金额',
              type: 'cancel'
          })
          return false
        } else if (!this.users.pwd) {
          localStorage.setItem('tiXian', 2)
          this.$vux.toast.show({
              text: '请先设置支付密码',
              type: 'cancel',
              onHide() {
                _this.$router.push({path: '/password1', query: {tiXian: 2}})
              }
          })
          return false
        }
        if (!this.price || this.price === '0') {
          this.$vux.toast.text('请输入支付金额')
          return false
        }
        this.confirmTiXian = true
      },
      forget() {
        this.$router.push('/password1')
      },
      tiXian() {
        if (this.psdText.length < 6) {
          this.$vux.toast.text('请输入完整支付密码')
          return false
        }
        let _this = this
        const datas = {userId: localStorage.getItem('id'), pwd: this.psdText, money: this.price, codeId: localStorage.getItem('codeId')}
        console.log(datas)
        consumption(datas).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.$vux.toast.show({
              text: '支付成功',
              onHide() {
                _this.$router.push('/paidSuccess')
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
              text: '支付失败',
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
      cancle() {
        this.confirmTiXian = false
      },
       _getToken() {
        this.$vux.loading.show({
          text: '授权中...'
        })
        let code = this.$route.query.code
        console.log(code, '11111111111')
        // const datas = {code: code, mpid: config.mpid, appid: config.appid}
        // console.log(datas)
        getToken({
          code: code, mpid: config.mpid, appid: config.appid
        }).then((res) => {
          console.log(res, 'getToken QrPaid了解一下')
          localStorage.token = res.data.data.token
          // console.log(res.data.data.wechatUser.openid, '000')
          localStorage.openId = res.data.data.wechatUser.openid
          this.$vux.loading.hide({
          text: '授权中...'
        })
          this._queryBalance()
        })
      },
      _getCode() {
          localStorage.token = ''
          localStorage.removeItem('token')
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.loginUrl + '/qrPaid' + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
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
    }
  }
</script>

<style lang='less' scoped>

@import '../../styles/variables.less';
.qr-paid-wrapper {
  padding-top: 2.066667rem;
  .money-num {
      margin: 0 .4rem .546667rem .4rem;
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
      margin: 1.333333rem /* 100/75 */ auto 0;
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
          border: .013333rem /* 1/75 */solid #F3EEEB;
          border-right: 0 none;
          text-align: center;
          &.last {
            border-right: .013333rem /* 1/75 */solid #F3EEEB;
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
        margin-top: 1.333333rem /* 100/75 */;
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
