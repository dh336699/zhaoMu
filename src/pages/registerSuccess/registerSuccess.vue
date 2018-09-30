<template>
  <article class="add-success-wrapper">
    <section class="content-wrapper">
      <img src="../../assets/images/2a@2x.png">
      <p>恭喜您，注册成功~</p>
    </section>

    <section class="set-psd">
      <p>设置支付密码</p>
      <ul class="psd-wrapper" @click="beginInput">
        <li><i v-if="psdText.length > 0"></i></li>
        <li><i v-if="psdText.length > 1"></i></li>
        <li><i v-if="psdText.length > 2"></i></li>
        <li><i v-if="psdText.length > 3"></i></li>
        <li><i v-if="psdText.length > 4"></i></li>
        <li><i v-if="psdText.length > 5"></i></li>
      </ul>
      <input password v-model="psdText" ref="pwd" type="number" oninput="if(value.length>5)value=value.slice(0,6)"  @input="changePsd"/>
    </section>
    <div style="text-align: center">
      <a class="btn" @click="confirm">确定</a>
    </div>
  </article>
</template>

<script>
import {savePwd} from '@/api/index'
export default {
  data() {
    return {
      psdText: '',
      isFocus: true
    }
  },
  mounted() {
    this.beginInput()
  },
  methods: {
    beginInput() {
      this.$refs.pwd.focus()
    },
    changePsd() {
      console.log(this.psdText)
    },
    confirm() {
      if (!this.psdText) {
        this.$router.replace('/center')
      } else if (this.psdText.length < 6) {
        this.$vux.toast.show({
            text: '密码不得少于6位，请重新输入'
          })
        this.psdText = ''
        return false
      }
      let _this = this
      const datas = {id: localStorage.getItem('id'), pwd: this.psdText}
      savePwd(datas).then((res) => {
        if (res.data.code === 0) {
          this.$vux.toast.show({
            text: '设置密码成功',
            onHide() {
              _this.goCenter()
            }
          })
        }
      })
    },
    goCenter() {
      this.$router.replace('/center')
    }
  },
  components: {
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
.add-success-wrapper {
  .content-wrapper {
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 5.333333rem;
    }
    p {
      position: absolute;
      top: 3.546667rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: .453333rem;
      color: #FFF38A;
    }
  }
  .set-psd{
    margin: 1.48rem .426667rem 0 .506667rem;
    text-align: center;
    p {
      margin-bottom: .64rem;
      font-size: .426667rem;
      color: #55504F;
    }
    .psd-wrapper {
      display: flex;
      justify-content: space-around;
      height: 1.493333rem;
      li {
        display: block;
        width: 1.333333rem;
        height: 100%;
        line-height: 1.493333rem;
        background: white;
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
  }
.btn {
     // position: absolute;
      // left: 50%;
      // bottom: 1.693333rem;
      // transform: translateX(-50%);
      display: inline-block;
      margin: 4.226667rem /* 317/75 */ auto 0;
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
