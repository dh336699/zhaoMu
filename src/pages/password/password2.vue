<template>
  <article class="add-success-wrapper">
    <x-header :left-options="{backText: ''}">支付密码</x-header>
    <section class="set-psd" @click="beginInput">
      <p>输入支付密码</p>
      <ul class="psd-wrapper">
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
      <a class="btn" @click="next">下一步</a>
    </div>
  </article>
</template>

<script>
import { XHeader } from 'vux'
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
      if (!this.psdText.length) {
        return false
      }
    },
    next() {
      let _this = this
      if (this.psdText.length < 6) {
        this.$vux.toast.show({
          text: '请输入完整的密码',
          type: 'cancel',
          onHide() {
            _this.psdText = ''
          }
        })
        return false
      } else {
        console.log('000')
        _this.$router.replace({path: '/password3', query: {psdText: this.psdText}})
      }
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
.add-success-wrapper {
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
      margin: 4.146667rem /* 311/75 */ auto 0;
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
