import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  expenseItems: [
    {name: 'Apartment', amount: 1400.0, category: 'Housing'},
    {name: 'Car Payment', amount: 400.0, category: 'Car'}
  ],
  incomeItems: [
    {name: 'Salary', amount: 4000.0, category: 'Salary'}
  ],
  categories: [
    'Housing',
    'Savings',
    'Car',
    'Salary'
  ]
}

const mutations = {
  addIncomeItem (state, item) {
    state.incomeItems.push(item)
  },
  addExpenseItem (state, item) {
    state.expenseItems.push(item)
  }
}

const actions = {
  addIncomeItem ({ commit }, item) {
    commit('addIncomeItem', item)
  },
  addExpenseItem ({ commit }, item) {
    commit('addExpenseItem', item)
  }
}

const getters = {
  aggregateIncome: state => {
    let sum = 0.0
    state.incomeItems.map(item => {
      sum += Number(item.amount)
    })
    return sum
  },
  aggregateExpenses: state => {
    let sum = 0.0
    state.expenseItems.map(item => {
      sum += Number(item.amount)
    })
    return sum
  },
  netMoney: (state, getters) => {
    return getters.aggregateIncome - getters.aggregateExpenses
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
