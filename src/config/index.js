import Env from './env'

const ajaxUrl = Env === 'development'
  ? 'http://daihao.frp.dev.wmeimob.com/api'
  : Env === 'production'
    ? 'http://wx.sunwithtree.com/api'
    : 'http://wx.xianni.wmeimob.com'

const appid = Env === 'development'
  ? 'wx8b804ab2c3772ae6'
  : Env === 'production'
    ? 'wxf319f6330c5e881c'
    : 'wx017048f8b68ee7f7'

const mpid = Env === 'development'
  ? '7'
  : Env === 'production'
    ? '10005'
    : '7'
const loginUrl = 'http://wx.sunwithtree.com'
let config = {
  api: ajaxUrl,
  appid,
  mpid,
  loginUrl
}
export default config
