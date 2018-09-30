<template>
  <article>
  </article>
</template>

<script>
  import {getToken} from '@/api/index'
  import config from '@/config/index'
  export default {
    data() {
      return {
      }
    },
   mounted() {
     console.log(this.$route.query.code)
    //  debugger
      if (localStorage.token) { // 如果有token去重定向页面
        this.$router.replace({
          path: '/center'
        })
      } else { // 没有token 去获取code和token
        if (!this.$route.query.code) { // 首次进来没有code 如果没有code，去调微信接口获取code
          this._getCode()
        } else { // 微信重定向回来第二次进来有code，和后台交换token
          this._getToken()
        }
      }
    },
    methods: {
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
          console.log(res, 'getToken了解一下')
          localStorage.token = res.data.data.token
          // console.log(res.data.data.wechatUser.openid, '000')
          localStorage.openId = res.data.data.wechatUser.openid
          this.$vux.loading.hide({
          text: '授权中...'
        })
          this.$router.push('/center')
        })
      },
      _getCode() {
        localStorage.token = ''
          localStorage.removeItem('token')
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.loginUrl + '/getToken' + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
</style>
