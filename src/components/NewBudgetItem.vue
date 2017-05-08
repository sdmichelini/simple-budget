<template>
  <div id='new-budget'>
    <div class="row">
      <h2>Create New Expense</h2>
      <button type="button" class="btn btn-danger" v-on:click="dismiss()">
        <i class="fa fa-times fa-lg" aria-hidden="true"></i>
      </button>
    </div>
    <div class="form-group row">
      <label for="expense-name-input" class="col-2 col-form-label">Name</label>
      <div class="col-10">
        <input class="form-control" v-model="name" type="text" placeholder="Enter Expense Name" id="expense-name-input">
      </div>
    </div>
    <div class="form-group row">
      <label for="expense-amount-input" class="col-2 col-form-label">Amount</label>
      <div class="col-10">
        <input class="form-control" step='0.01' v-model="amount" type="number" id="expense-amount-input">
      </div>
    </div>
    <div class='form-group row'>
      <label for="expense-category-input" class="col-2 col-form-label">Category</label>
      <div class="col-10">
        <select v-model="selected" class="form-control">
          <option v-for="option in $store.state.categories" v-bind:value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <button type="button" class="btn btn-success" :disabled="!inputValid()" v-on:click="createNewExpense()">Create Expense</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'new-budget',
  data: () => {
    return {
      name: '',
      amount: 0.0,
      selected: 'Housing'
    }
  },
  methods: {
    ...mapActions([
      'addExpenseItem'
    ]),
    inputValid () {
      return (this.name !== undefined) &&
            (this.name.length > 0) &&
            (this.amount > 0.0) &&
            (this.selected !== '')
    },
    createNewExpense () {
      const item = {
        name: this.name,
        amount: this.amount,
        category: this.selected
      }
      this.addExpenseItem(item)
    },
    dismiss () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
h2 {
  display: inline;
}

.btn-danger {
  margin-left: auto;
  margin-right: 16px;
}

#new-budget {
  margin-top: 10px;
  margin-left: 16px;
}

.row {
  margin-top: 10px;
}
</style>
