<template>
  <article class="bank-card-info-wrapper">
    <x-header :left-options="{backText: ''}">我的银行卡</x-header>
    <div class="bank-card-info">
      <section class="common-wrapper">
      <p class="left">持卡人</p>
      <input type="text" class="right" placeholder='请输入姓名' v-model="name" @blur="username(0)">
      </section>
      <section class="picker-wrapper">
        <popup-picker class="common-wrapper2"
        :title="title1"
        :data="list1" v-model="bankName"
        placeholder="请选择银行"
        @on-change="onChange"></popup-picker>
        <img src="../../assets/images/4b@2x.png">
      </section>
      <!-- <section class="common-wrapper">
        <p class="left">银行</p>
        <input type="text" class="right" placeholder='请输入银行' v-model="bankName" @blur="username(1)">
        <p class="right">中国银行</p>
      </section> -->
      <section class="common-wrapper">
        <p class="left">开户行</p>
        <input type="text" class="right" placeholder='请输入开户行' v-model="bankAddress" @blur="username(2)">
        <!-- <p class="right">中国银行上海陆家嘴分行</p> -->
      </section>
      <section class="common-wrapper">
        <p class="left">卡号</p>
        <input type="number" class="right" placeholder='请输入银行卡号' v-model="cardNo">
        <!-- <p class="right">46287428742842572</p> -->
      </section>
      <!-- <section class="picker-wrapper">
        <popup-picker class="common-wrapper2"
        :title="title1"
        :data="list1" v-model="value1"
        placeholder="请选择银行"
        @on-change="onChange"></popup-picker>
        <img src="../../assets/images/4b@2x.png">
      </section> -->
    </div>
    <div style="text-align: center">
      <a class="btn" @click="confirm">确定</a>
    </div>
  </article>
</template>

<script>
import { XHeader, PopupPicker } from 'vux'
import {saveCard} from '@/api/index'
export default {
  data() {
    return {
      card: false,
      name: '',
      bankName: [],
      bankAddress: '',
      cardNo: '',
      title1: '银行',
      list1: [['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '招商银行', '中信银行', '兴业银行', '中国邮政储蓄银行']],
      value1: []
    }
  },
  methods: {
    onChange(val) {
      console.log('val change', this.bankName)
    },
    username(type) {
      let reg1 = /^[A-Za-z0-9]+$/
      if (type === 0) {
        if (reg1.test(this.name)) {
        this.name = ''
        this.$vux.toast.text('请输入正确的姓名格式')
        }
      } else if (type === 1) {
        if (reg1.test(this.bankName)) {
        this.bankName = ''
        this.$vux.toast.text('请输入正确的银行')
        }
      } else if (type === 2) {
        if (reg1.test(this.bankAddress)) {
        this.bankAddress = ''
        this.$vux.toast.text('请输入正确的开户行')
        }
      }
    },
    confirm() {
      // let reg1 = /^[A-Za-z0-9]+$/
      if (!this.name || !this.bankName || !this.bankAddress) {
        this.$vux.toast.show({
          text: '请检查是否有空',
          type: 'cancel'
          })
        return
      }
      let isAdd = this.$route.query.isAdd
      let _this = this
      this.bankName = this.bankName.join('')
      const datas = { userId: localStorage.getItem('id'), name: this.name, bankName: this.bankName, bankAddress: this.bankAddress, cardNo: this.cardNo }
      console.log(datas)
      saveCard(datas).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.$vux.toast.show({
            text: '添加银行卡成功',
            onHide() {
              _this.$router.replace({path: '/addSuccess', query: {isAdd: isAdd}})
            }
          })
        }
      })
    }
  },
  components: {
    XHeader,
    PopupPicker
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
.bank-card-info-wrapper {
  .bank-card-info {
    margin-top: .133333rem;
    padding-left: 0.386667rem;
    // padding-right: 0.386667rem;
    background: white;
    .common-wrapper {
      display: flex;
      align-items: center;
      height: 1.173333rem;
      width: 100%;
      padding-right: 0.386667rem;
      border-bottom: 0.013333rem solid #dbdfdd;
      font-size: 0.373333rem;
      .left {
        flex: 0 0 1.653333rem /* 100/75 */;
        // margin-right: 1.653333rem /* 124/75 */;
        color: #55504f;
      }
      .right {
        flex: 1;
        color: #231815;
      }
    }
    .picker-wrapper {
      display:flex;
      align-items: center;
      padding-right: 0.386667rem;
      border-bottom: 0.013333rem solid #dbdfdd;
      .common-wrapper2 {
        display: flex;
        align-items: center;
        height: 1.173333rem;
        width: 100%;
        font-size: 0.373333rem;
        .left {
          flex: 0 0 1.653333rem /* 100/75 */;
          // margin-right: 1.653333rem /* 124/75 */;
          color: #55504f;
        }
        .right {
          flex: 1;
          color: #231815;
        }
      }
      img {
        width: .28rem /* 21/75 */;
        height: .493333rem /* 37/75 */;
      }
    }
  }
  .btn {
      // position: absolute;
      // left: 50%;
      // bottom: 1.693333rem;
      // transform: translateX(-50%);
      display: block;
      margin: 3.266667rem /* 245/75 */ auto 0;
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
