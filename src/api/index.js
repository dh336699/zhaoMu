import Util from '@/libs/util'
// import config from '@/config'
// import { formatGetUri, formatFormData } from '@/utils'
// 获取jssdk
export const gainWx = data => Util.http.get('/core/jssdk' + '?currentUrl=' + data.currentUrl, {})
// 获取token
export const getToken = data => Util.http.get('/core/getToken?code=' + data.code + '&mpid=' + data.mpid + '&appid=' + data.appid, {})

// 个人中心
export const queryBalance = data => Util.http.get('/core/queryBalance?openid=' + data.openid, {})
// 获取验证码
export const regSms = data => Util.http.get('/common/reg-sms?mobile=' + data.mobile, {})
// 注册
export const testCode = data => Util.http.get('/core/testCode?mobile=' + data.mobile + '&code=' + data.code + '&openid=' + data.openid + '&token=' + localStorage.getItem('token') + '&type=' + data.type, {})
// 设置支付密码
export const savePwd = data => Util.http.post('/core/savePwd?id=' + data.id + '&pwd=' + data.pwd, {})
// 我的银行卡
export const queryBrankList = data => Util.http.get('/brank/queryBrankList?id=' + data.id, {})
// 添加银行卡
export const saveCard = data => Util.http.post('/brank/saveCard', data)
// 余额明细
export const getUserLogList = data => Util.http.get('/userLog/getUserLogList?id=' + data.id, {})
// 充值方案列表
export const getRechargeList = data => Util.http.get('/recharge/getRechargeList', {})
// 立即充值
export const payRecharge = data => Util.http.post('/recharge/payRecharge', data)
// 已返利
export const getRebateLogList = data => Util.http.get('/userLog/getRebateLogList?id=' + data.id, {})
// 去提现
export const savaReviewed = data => Util.http.post('/wxReviewed/savaReviewed', data)
// 扫码支付
export const consumption = data => Util.http.post('/core/consumption', data)
