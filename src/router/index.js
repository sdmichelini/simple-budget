import Vue from 'vue'
import Router from 'vue-router'
import Budget from '@/components/Budget'
import Category from '@/components/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Budget',
      component: Budget
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Category
    }
  ]
})
