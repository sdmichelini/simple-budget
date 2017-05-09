<template>
<div class="form-group row">
  <label for="expense-amount-input" class="col-2 col-form-label">Amount</label>
  <div class="col-10">
    <input class="form-control" step='0.01' v-model.number="amount" type="number" id="expense-amount-input" v-on:keyup="onAmountChange">
  </div>
</div>
</template>
<script>
export default {
  name: 'fixed-budget-item',
  data: () => {
    return {
      amount: 0.0
    }
  },
  methods: {
    onAmountChange () {
      // Tell the parent if the change is valid
      let validInput = (this.amount > 0.0)
      this.$emit('item', {amount: this.amount, type: 0}, validInput)
    }
  }
}
</script>
<style>

</style>
