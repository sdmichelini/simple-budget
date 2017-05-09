<template>
<div>
<div class="form-group row">
  <label for="expense-percentage-input" class="col-2 col-form-label">Percentage</label>
  <div class="col-10">
    <input class="form-control" step='0.01' v-model.number="percentage" type="number" id="expense-percentage-input" v-on:keyup="onAmountChange">
  </div>
</div>
<div class="form-group row">
  <label for="expense-other-input" class="col-2 col-form-label">Other Item</label>
  <div class="col-10">
    <select class="form-control" v-model="selectedItem" v-on:change="onAmountChange">
        <option v-for="option in $store.getters.allItems" v-bind:value="option.id">
        {{ option.name }}
        </option>
      </select>
  </div>
</div>
</div>
</template>
<script>
export default {
  name: 'percentage-budget-item',
  data: () => {
    return {
      percentage: 0.0,
      selectedItem: undefined
    }
  },
  methods: {
    onAmountChange () {
      // Tell the parent if the change is valid
      let validInput = (this.percentage > 0.0) &&
        (this.selectedItem !== undefined)

      this.$emit('item', {
        percentage: this.percentage / 100.0,
        type: 1,
        calculationId: this.selectedItem
      }, validInput)
    }
  }
}
</script>
<style>

</style>
