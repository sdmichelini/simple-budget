<template>
    <div id='budget'>
        <h1>Budget</h1>
        <h2>Income</h2>
        <div class="list-group">
            <template v-for="item in $store.state.incomeItems">
                <budget-item v-bind:item="item"></budget-item>
            </template>
        </div>
        <new-budget-item v-if="createNewIncome" v-on:close="closeIncome()" isExpense="false"></new-budget-item>
        <button type="button" class="btn btn-success" v-if="!createNewIncome" v-on:click="onCreateIncome()">
          Create New Income Item
        </button>
        <h2>Expenses</h2>
        <div class="list-group">
            <template v-for="item in $store.state.expenseItems">
                <budget-item v-bind:item="item"></budget-item>
            </template>
        </div>
        <new-budget-item v-if="createNewExpense" v-on:close="closeExpense()" isExpense="true"></new-budget-item>
        <button type="button" class="btn btn-success" v-if="!createNewExpense" v-on:click="onCreateExpense()">
          Create New Expense Item
        </button>
    </div>
</template>
<script>

export default {
  name: 'budget',
  data: () => {
    return {
      createNewExpense: false,
      createNewIncome: false
    }
  },
  methods: {
    onCreateExpense () {
      this.createNewExpense = true
      this.createNewIncome = false
    },
    closeExpense () {
      this.createNewExpense = false
    },
    onCreateIncome () {
      this.createNewExpense = false
      this.createNewIncome = true
    },
    closeIncome () {
      this.createNewIncome = false
    }
  }
}
</script>
<style scoped>
button {
  margin-top: 10px;
}
</style>
