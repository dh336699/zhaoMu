<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

#app {
    height: 100%;
    background: #F3EEEB;
    .vux-header {
      background: white;
      color: #231815!important;
      .vux-header-title {
        font-size: .426667rem;
        color: #231815!important;
      }
    }

    .common-wrapper2 {
      display: flex;
      width: 100%;
      .weui-cell {
        display: flex;
        flex: 1;
        padding: 0;
      }
      .weui-cell__hd {
        flex: 0 0 1.653333rem /* 100/75 */;
        // margin-right: 1.653333rem /* 124/75 */;
        color: #55504f;
      }
      .weui-cell__ft:after {
        border-style: none;
      }
      .vux-popup-picker-select-box {
        flex: 1;
        color: #231815;
        .vux-popup-picker-select {
          text-align: left !important;
          .vux-popup-picker-placeholder {
            color: #B6B2B0
          }
        }
      }
    }
    .vux-cell-box {
      &:before {
        width: auto;
        border-top: 0 none;
      }
    }
}

</style>
