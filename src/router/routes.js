const getToken = r => require.ensure([], () => r(require('@/pages/getToken/getToken')), 'getToken')
const register = r => require.ensure([], () => r(require('@/pages/register/register')), 'register')
const center = r => require.ensure([], () => r(require('@/pages/center/center')), 'center')
const userinfo = r => require.ensure([], () => r(require('@/pages/userinfo/userinfo')), 'userinfo')
const password1 = r => require.ensure([], () => r(require('@/pages/password/password1')), 'password1')
const password2 = r => require.ensure([], () => r(require('@/pages/password/password2')), 'password2')
const password3 = r => require.ensure([], () => r(require('@/pages/password/password3')), 'password3')
const bankCard = r => require.ensure([], () => r(require('@/pages/bankCard/bankCard')), 'bankCard')
const bankCardInfo = r => require.ensure([], () => r(require('@/pages/bankCardInfo/bankCardInfo')), 'bankCardInfo')
const addSuccess = r => require.ensure([], () => r(require('@/pages/addSuccess/addSuccess')), 'addSuccess')
const yuE = r => require.ensure([], () => r(require('@/pages/yu-e/yu-e')), 'yuE')
const chongzhi = r => require.ensure([], () => r(require('@/pages/chongzhi/chongzhi')), 'chongzhi')
const supplySuccess = r => require.ensure([], () => r(require('@/pages/supplySuccess/supplySuccess')), 'supplySuccess')
const paidSuccess = r => require.ensure([], () => r(require('@/pages/paidSuccess/paidSuccess')), 'paidSuccess')
const registerSuccess = r => require.ensure([], () => r(require('@/pages/registerSuccess/registerSuccess')), 'registerSuccess')
const fanliDesc = r => require.ensure([], () => r(require('@/pages/fanliDesc/fanliDesc')), 'fanliDesc')
const applyMoney = r => require.ensure([], () => r(require('@/pages/applyMoney/applyMoney')), 'applyMoney')
const qrPaid = r => require.ensure([], () => r(require('@/pages/qrPaid/qrPaid')), 'qrPaid')
const chongzhiCard = r => require.ensure([], () => r(require('@/pages/chongzhi/chongzhiCard')), 'chongzhiCard')

export default [
  {
    path: '/',
    redirect: '/getToken'
  }, {
    path: '/getToken',
    name: 'getToken',
    meta: {
      title: '授权',
      requireAuth: true
    },
    component: getToken
  }, {
    path: '/register',
    name: 'register',
    meta: {
      title: '用户注册',
      requireAuth: true
    },
    component: register
  }, {
    path: '/center',
    name: 'center',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: center
  }, {
    path: '/userinfo',
    name: 'userinfo',
    meta: {
      title: '个人资料',
      requireAuth: true
    },
    component: userinfo
  }, {
    path: '/password1',
    name: 'password1',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: password1
  }, {
    path: '/password2',
    name: 'password3',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: password2
  }, {
    path: '/password3',
    name: 'password3',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: password3
  }, {
    path: '/bankCard',
    name: 'bankCard',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: bankCard
  }, {
    path: '/bankCardInfo',
    name: 'bankCardInfo',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: bankCardInfo
  }, {
    path: '/addSuccess',
    name: 'addSuccess',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: addSuccess
  }, {
    path: '/yuE',
    name: 'yuE',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: yuE
  }, {
    path: '/chongzhi',
    name: 'chongzhi',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: chongzhi
  }, {
    path: '/supplySuccess',
    name: 'supplySuccess',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: supplySuccess
  }, {
    path: '/paidSuccess',
    name: 'paidSuccess',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: paidSuccess
  }, {
    path: '/registerSuccess',
    name: 'registerSuccess',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: registerSuccess
  }, {
    path: '/fanliDesc',
    name: 'fanliDesc',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: fanliDesc
  }, {
    path: '/applyMoney',
    name: 'applyMoney',
    meta: {
      title: '个人中心',
      requireAuth: true
    },
    component: applyMoney
  }, {
    path: '/qrPaid',
    name: 'qrPaid',
    meta: {
      title: '扫码支付',
      requireAuth: true
    },
    component: qrPaid
  }, {
    path: '/chongzhiCard',
    name: 'chongzhiCard',
    meta: {
      title: '扫码支付',
      requireAuth: true
    },
    component: chongzhiCard
  }
]
