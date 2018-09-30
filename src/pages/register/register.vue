<template>
  <article class="register-wrapper">
    <section class="input-wrapper">
      <div class="mobile-wrapper">
        <img src="../../assets/images/1b@2x.png">
        <span>手机号</span>
        <input type="number" title="text" placeholder="请输入手机号" v-model="phoneno" oninput="if(value.length>=15)value=value.substring(0,15)"/>
      </div>
      <div class="verify-wrapper">
        <img src="../../assets/images/1c@2x.png">
        <span>验证码</span>
        <input type="number" title="text" placeholder="请输入验证码" v-model="code" oninput="if(value.length>=6)value=value.substring(0,6)"/>
        <a href="javascript:void(0)" @click="checkValidData" :disabled="start">
          {{ start?'':'获取验证码'}}
            <countdown v-if="start" v-model="countNum" :start="start" @on-finish="finished"></countdown>
          {{ start?'s':''}}
        </a>
      </div>
    </section>
    <section class="shen-ming">
      <img src="../../assets/images/444@2x.png" v-if="!show2" alt="" @click="show2 = true">
      <img src="../../assets/images/44@2x.png" v-else alt="" @click="show2 = false">
      <p style="display:inline-block;vertical-align: middle">
        注册即代表同意
        <a @click="show1 = ! show1">wow烤充值消费协议</a>
      </p>
    </section>
    <div v-transfer-dom class="popup-wrapper">
      <popup v-model="show1" height="91%" width="92%" style="background:#FFFFFF;">
        <div class="popup1" style="padding: 25px 17px 25px;">
            <p style="font-size: 16px;color:#231815;text-align:center;line-height: 1.5">WOW烤充值协议</p>
            <span style="position:absolute;right:22px;top:15px;width:13px;
                    height:13px;
                    font-size:34px;
                    font-family:PingFang-SC-Light;
                    color:rgba(130,127,126,1);
                    line-height:0px;transform:rotate(45deg)" @click="close">+</span>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第一条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">WOW烤来一把烤串由上海曌木餐饮管理有限公司（以
下简称“WOW烤”）设立，可在WOW烤及合作的第三方
服务提供商处消费的，可反复充值的预付账户。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第二条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">WOW烤账户名为用户购买时提供的手机号码，用户享
受各项服务均需要通过该手机号码进行操作，请妥善保管。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第三条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">凡在中华人民共和国境内具有完全民事行为能力的境内
外居民（以下统称“个人”）均可申请办理WOW烤账户。
申请办理、使用WOW烤账户的个人，均须遵守本管理
规定的各项规定。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第四条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">账户申请方式。个人用户可以通过公众号进行注册账户。
账户的用户名为微信名，申请人不能通过现金支付，应
通过微信支付方式充值。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第五条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">用户充值后，账户充值余额不能办理退款以及赠送金额
均不能转移、转赠。账户余额请您根据自己的消费情况
充值，WOW烤公众号平台对充值次数不设限制。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第六条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">用户办理充值金额为四个档次的定额充值，分别为：500元、
1000元、2000元、3000元（具体详见微信公众号会员充值
界面）。24小时之内不可重复充值。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第七条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">1. 充值当日不可进行消费用餐抵扣
2. 充值当日对其用餐金额进行折扣，充值500元对当日用餐
消费金额打9.5折，1000元为9折，2000元为8.5折，3000元
为8折。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第八条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">充值返现金额详情请见公众号充值端页面，返现金额次月起分10个月返还到平台个人账户。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第九条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">1. 充值金额不能进行提现，返现金额可消费或提现。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">2. 提现金额需大于等于100元。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">3. 次月起，返现金额可进行提现，提现后两到三个工作日将返还到对应的银行账户（节假日相应延后）。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">4. 用户提现银行设置需符合本平台相应关联银行（中国工商银行、中国农业银行、中国银行、中国建设银行、交通银行、招商银行、中信银行、兴业银行、中国邮政储蓄银行），若超出关联银行范围，本平台将不予受理。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">账户使用。用户在就餐后，可以通过询问服务员进行账户付款。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十一条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">WOW烤账户开通后，申请人应当妥善保管账号、密码及相关信息，WOW烤公众号平台不对因申请人原因导致的包括不限于账号、密码及相关信息的丢失、泄露、被窃或未经授权使用负责。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十二条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">WOW烤账户应由账户所有人使用和保管。账户持有人因向他人转借、转让或因保管不慎而发生的一切消费费用及损失由账户持有人承担。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十三条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">本公司及其关联公司不提供与WOW烤账户有关的明示或暗示的保证，包括但不限于对于其商业性或适用于特定用途的任何明示或暗示的保证。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十四条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">为更好地提供服务，我们可以随时修改上述条款。请您定期查阅本规定。我们会在微信公众号上公布这些条款的修改通知。如果本规定中任何一条被视为废止、无效或因任何理由不可执行，该使用条件应视为可分割的且不影响任何其余条款的有效性和可执行性。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十五条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">申请人在申请WOW烤账户前，确认已经就全部条款进行了详细地阅读，双方对本管理规定的全部条款均无异议，并对本管理规定准确无误的理解。</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">第十六条</p>
            <p style="font-size: 13px;color:#55504F;line-height:1.5">有关WOW烤账户相关解释均适用中华人民共和国法律。</p>
        </div>
      </popup>
    </div>
    <div style="text-align:center">
      <a href="javascript:void(0)" class="btn" @click="checkEmpty">注册</a>
    </div>
  </article>

</template>

<script>
import { XInput, Countdown, Popup, TransferDom } from 'vux'
import { regSms, testCode } from '@/api/index'

export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      countNum: 60,
      start: false,
      show: false,
      phoneno: null,
      code: '',
      show1: false,
      show2: false
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
      // this.getValidCode()
      regSms({mobile: this.phoneno}).then((res) => {
        console.log(res)
      })
    },
    checkEmpty() {
      const testPhone = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/

      if (this.phoneno === '') {
        this.$vux.toast.text('手机号不能为空！')
        return
      }

      if (!testPhone.test(this.phoneno)) {
        this.$vux.toast.text('请输入正确的手机号！')
        return
      }

      if (this.code === '') {
        this.$vux.toast.text('请输入验证码！')
        return
      }
      if (!this.show2) {
        this.$vux.toast.text('请先阅读并同意wow烤充值消费协议！')
        return
      }
      console.log(typeof (this.phoneno))
      const datas = {mobile: this.phoneno, code: this.code, openid: localStorage.getItem('openId'), type: 0}
      testCode(datas).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          localStorage.setItem('id', res.data.data.user.id)
          this.$router.replace('/registerSuccess')
        } else {
          this.$vux.toast.text(res.data.msg)
        }
      })
    },
    finished(index) {
      this.start = false
      this.countNum = 60
    },
    close() {
      this.show1 = false
    }
  },
  components: {
    XInput,
    Countdown,
    Popup
  }
}
</script>

<style lang="less" scoped>
 @import '../../styles/variables.less';
  .register-wrapper {
    position: relative;
    background-image: url(../../assets/images/1a@2x.png);
    background-size: 100% 100%;
    min-height: 100%;
    max-width: 100%;
    .input-wrapper {
      position: absolute;
      top: 5.506667rem;
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
    .shen-ming {
      display: inline-block;
      margin: 10.133333rem /* 760/75 */ .386667rem /* 29/75 */ 0;
      font-size: .346667rem /* 26/75 */;
      img {
        margin-right: .266667rem /* 20/75 */;
        vertical-align: middle;
        width: .56rem /* 42/75 */;
        height: .56rem /* 42/75 */;
      }
      a {
        color: #EE681F;
      }
    }
    .btn {
      // position: absolute;
      // left: 50%;
      // bottom: 1.693333rem;
      // transform: translateX(-50%);
      display: inline-block;
      margin: 2.52rem /* 189/75 */ auto 0;
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
      border-radius: 1.146667rem /* 86/75 */;
    }
  }
</style>
