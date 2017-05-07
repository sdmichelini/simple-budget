import Vue from 'vue'
import Router from 'vue-router'
import Budget from '@/components/Budget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Budget',
      component: Budget
    }
  ]
})
