// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import BudgetItem from './components/BudgetItem.vue'
import NewBudgetItem from './components/NewBudgetItem.vue'
import NewFixedItemStrategy from './components/NewFixedItemStrategy.vue'

Vue.config.productionTip = false

Vue.component('budget-item', BudgetItem)
Vue.component('new-budget-item', NewBudgetItem)
Vue.component('fixed-budget-item', NewFixedItemStrategy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
