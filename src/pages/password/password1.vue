<template>
  <article class="psd-wrapper">
    <x-header :left-options="{backText: ''}">支付密码</x-header>
    <section class="input-wrapper">
      <div class="mobile-wrapper">
        <img src="../../assets/images/1b@2x.png">
        <span>手机号</span>
        <input type="number" title="text" placeholder="请输入手机号" v-model="phoneno" oninput="if(value.length>=15)value=value.slice(0,15)"/>
      </div>
      <div class="verify-wrapper">
        <img src="../../assets/images/1c@2x.png">
        <span>验证码</span>
        <input type="number" title="text" placeholder="请输入验证码" v-model="code" oninput="if(value.length>=6)value=value.slice(0,6)"/>
        <a href="javascript:void(0)" @click="checkValidData" :disabled="start">
          {{ start?'':'获取验证码'}}
            <countdown v-if="start" v-model="countNum" :start="start" @on-finish="finished"></countdown>
          {{ start?'s':''}}
        </a>
      </div>
    </section>
    <a href="javascript:void(0)" class="btn" @click="checkEmpty">下一步</a>
  </article>
</template>

<script>
import { XHeader, XInput, Countdown } from 'vux'
import { regSms, testCode } from '@/api/index'
export default {
  data() {
    return {
      countNum: 60,
      start: false,
      show: false,
      phoneno: '',
      code: ''
    }
  },
  methods: {
    checkValidData() {
      const testPhone = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/

      if (!testPhone.test(this.phoneno)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      this.start = true
      regSms({mobile: this.phoneno}).then((res) => {
        console.log(res)
      })
    },
    checkEmpty() {
      // let tiXian = this.$route.query.tiXian
      const testPhone = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/

      if (this.phoneno === '') {
        this.$vux.toast.text('手机号不能为空！')
        return
      }

      if (!testPhone.test(this.phoneno)) {
        this.$vux.toast.text('请输入正确的手机号！')
        return
      }

      if (this.code === '' || this.code.length < 4) {
        this.$vux.toast.text('请输入完整的验证码！')
        return
      }
      let openid = localStorage.getItem('openId')
      console.log(openid)
      // const datas = {mobile: this.phoneno, code: this.code, openid: localStorage.getItem('openId'), type: 1}
      testCode({mobile: this.phoneno, code: this.code, openid: localStorage.getItem('openId'), type: 1}).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          localStorage.setItem('id', res.data.data.user.id)
          this.$router.replace('/password2')
        } else {
          this.$vux.toast.text(res.data.msg)
        }
      })
    },
    finished(index) {
      this.start = false
      this.countNum = 60
    }
  },
  components: {
    XInput,
    Countdown,
    XHeader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';
  .psd-wrapper {
    position: relative;
    min-height: 100%;
    max-width: 100%;
    .input-wrapper {
      position: absolute;
      top: 1.573333rem;
      left: 50%;
      transform: translateX(-50%);
      width: 9.2rem;
      height: 4.106667rem;
      padding-left: .48rem;
      padding-right: .413333rem;
      border-radius: 10px;
      background: #FFFFFF;
      .mobile-wrapper {
        display: flex;
        align-items: center;
        padding-top: .76rem;
        padding-bottom: .506667rem;
        border-bottom: .013333rem solid #DBDFDD;
        box-sizing: border-box;
        img {
          flex: 0 0 .36rem; /* 27/75 */
          margin-right: .36rem;
          // background-image: url(../../assets/images/1b@2x.png);
          // background-size: .306667rem .426667rem;
          width: .306667rem;
          height: .426667rem;
        }
          span {
            flex: 0 0 1.96rem;
            color: #231815;
            font-size: .373333rem;
          }
          input {
            flex: 1;
            width: 2.12rem;
            font-size: .373333rem;
          }
      }
      .verify-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        padding-top: .333333rem;
        padding-bottom: .333333rem;
        border-bottom: .013333rem solid #DBDFDD;
        box-sizing: border-box;
        img {
          flex: 0 0 .36rem; /* 27/75 */
          margin-right: .36rem;
          // background-image: url(../../assets/images/1c@2x.png);
          // background-size: .306667rem .426667rem;
          width: .306667rem;
          height: .426667rem;
        }
          span {
            flex: 0 0 1.96rem;
            font-size: .373333rem;
          }
          input {
            flex: 1;
            width: 2.12rem;
            font-size: .373333rem;
          }
          a {
            flex: 0 0 2.346667rem;
            width: 2.346667rem;
            height: .8rem;
            line-height: .8rem;
            background: -webkit-gradient(linear, left top, left bottom, from(#C41F21), to(#EE681F));
            border-radius: .4rem;
            color: white;
            text-align: center;
            font-family: PingFang-SC-Regular;
          }
      }
    }
    .btn {
      // position: fixed;
      // left: 50%;
      margin: 9.28rem /* 696/75 */auto;
      display: block;
      // margin-bottom: 5.626667rem;
      // bottom: 5.626667rem;
      // transform: translateX(-50%);
      width: 9.2rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      padding-left: .386667rem;
      padding-right: .4rem;
      background: @background;
      border-radius: .573333rem;
      color: white;
      font-size: .453333rem;
      text-align: center;
      font-family: PingFang-SC-Regular;
    }
  }
</style>
