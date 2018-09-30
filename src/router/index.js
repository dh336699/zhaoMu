import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {queryBalance} from '@/api/index'
// import store from '@/store/index'

Vue.use(Router)

const RouterConfig = {
  mode: 'history',
  routes
}

const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  if (to.name === 'center') {
    const datas = {openid: localStorage.getItem('openId')}
      // debugger
    queryBalance(datas).then((res) => {
      console.log(res, 'VUe-Router')
      // debugger
        if (!res.data.data.user.tel) {
          next('/register')
          return false
        } else {
          next()
        }
    })
    return false
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    // if (users) {
    //   next()
    // } else {
    //   next({
    //     path: '/redirectIndex'
    //   })
    // }
    next()
  } else {
    next()
  }
  next()
})
//
// router.afterEach(() => {
//
// })

export default router
