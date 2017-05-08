<template>
    <div id='budget'>
        <h1>Budget</h1>
        <h2>Income</h2>
        <div class="list-group">
            <template v-for="item in $store.state.incomeItems">
                <budget-item v-bind:item="item"></budget-item>
            </template>
        </div>
        <h2>Expenses</h2>
        <div class="list-group">
            <template v-for="item in $store.state.expenseItems">
                <budget-item v-bind:item="item"></budget-item>
            </template>
        </div>
        <new-budget-item v-if="createNewExpense" v-on:close="closeExpense()"></new-budget-item>
        <button type="button" class="btn btn-success" v-if="!createNewExpense" v-on:click="onCreateExpense()">Create New Expense</button>
    </div>
</template>
<script>

export default {
  name: 'budget',
  data: () => {
    return {
      createNewExpense: false
    }
  },
  methods: {
    onCreateExpense () {
      this.createNewExpense = true
    },
    closeExpense () {
      this.createNewExpense = false
    }
  }
}
</script>
<style>

</style>
