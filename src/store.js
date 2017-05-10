import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let nextId = 0

function makeGenericItem (name, amount, category) {
  return {name: name, amount: amount, category: category, type: 0, id: nextId++}
}

function makeCalculatedPercentageItem (name, percentage, category, calculationId) {
  return {name: name, category: category, type: 1, id: nextId++, percentage: percentage, calculationId: calculationId}
}

function getAmountForItemR (item, allItems, visitedIds) {
  if (item.type === 0) {
    return item.amount
  }
  // Circular Reference Error Check
  if (visitedIds.includes(item.id)) {
    return NaN
  } else {
    let checkItem
    for (let item1 of allItems) {
      if (item1.id === item.calculationId) {
        checkItem = item1
        break
      }
    }
    // Could we find the item?
    if (checkItem !== undefined) {
      return item.percentage * getAmountForItemR(checkItem, allItems, visitedIds.concat(item.id))
    } else {
      return NaN
    }
  }
}

const state = {
  expenseItems: [
    makeGenericItem('Apartment', 1400.00, 'Housing'),
    makeGenericItem('Car Payment', 400.00, 'Car'),
    makeCalculatedPercentageItem('Savings', 0.2, 'Savings', 0)
  ],
  incomeItems: [
    makeGenericItem('Salary', 4000.00, 'Salary')
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
    if (item.id === undefined) {
      item.id = nextId++
    }
    state.incomeItems.push(item)
  },
  addExpenseItem (state, item) {
    if (item.id === undefined) {
      item.id = nextId++
    }
    state.expenseItems.push(item)
  },
  updateItem (state, item) {
    console.log(item)
    const allItems = state.incomeItems.concat(state.expenseItems)
    for (let item1 of allItems) {
      if (item1.id === item.id) {
        console.log(item1)
        item1 = Object.assign(item1, item)
        console.log(item1)
        break
      }
    }
  }
}

const actions = {
  addIncomeItem ({ commit }, item) {
    commit('addIncomeItem', item)
  },
  addExpenseItem ({ commit }, item) {
    commit('addExpenseItem', item)
  },
  updateItem ({ commit }, item) {
    commit('updateItem', item)
  }
}

const getters = {
  getAmountForItem: (state, getters) => (item) => {
    let amount = Number(getAmountForItemR(item, state.incomeItems.concat(state.expenseItems), []))
    if (amount.isNaN) {
      amount = 0.0
    }
    return amount
  },
  aggregateIncome: (state, getters) => {
    let sum = 0.0
    state.incomeItems.map(item => {
      sum += Number(getters.getAmountForItem(item, state))
    })
    return sum
  },
  aggregateExpenses: (state, getters) => {
    let sum = 0.0
    state.expenseItems.map(item => {
      sum += Number(getters.getAmountForItem(item, state))
    })
    return sum
  },
  netMoney: (state, getters) => {
    return getters.aggregateIncome - getters.aggregateExpenses
  },
  allItems: (state) => {
    return state.incomeItems.concat(state.expenseItems)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
