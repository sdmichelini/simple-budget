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
        <new-budget-item></new-budget-item>
    </div>
</template>
<script>

export default {
  name: 'budget',
  data: () => {
    return {
      expenseItems: [
          {name: 'Apartment', amount: 1400.0, category: 'Housing'},
          {name: 'Car Payment', amount: 400.0, category: 'Car'}
      ]
    }
  }
}
</script>
<style>

</style>
