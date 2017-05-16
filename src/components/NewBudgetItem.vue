<template>
  <div id='new-budget'>
    <div class="row">
      <h2>Create New {{ getTypeString() }}</h2>
      <button type="button" class="btn btn-danger" v-on:click="dismiss()">
        <i class="fa fa-times fa-lg" aria-hidden="true"></i>
      </button>
    </div>
    <div class="form-group row">
      <label for="expense-name-input" class="col-2 col-form-label">Name</label>
      <div class="col-10">
        <input class="form-control" v-model="name" type="text" :placeholder=getTypeString() id="expense-name-input">
      </div>
    </div>
    <div class='form-group row'>
      <label for="expense-category-input" class="col-2 col-form-label">Category</label>
      <div class="col-10">
      <select v-model="selected" class="form-control">
        <option v-for="option in $store.state.categories" v-bind:value="option.name">
        {{ option.name }}
        </option>
      </select>
      </div>
    </div>
    <label>Type of {{ getTypeString() }}</label>
    <hr>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" v-model="picked" name="inlineRadioOptions" id="inlineRadio1" value="fixed"> Fixed
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" v-model="picked" name="inlineRadioOptions" id="inlineRadio2" value="percent"> Percentage of Other Item
      </label>
    </div>
    <!---Strategy goes here-->
    <fixed-budget-item v-on:item="itemChange" v-if="isFixed()"></fixed-budget-item>
    <percentage-budget-item v-on:item="itemChange" v-if="isPercentage()"></percentage-budget-item>
    <div class="form-group row">
      <button type="button" class="btn btn-success" :disabled="!inputValid()" v-on:click="createNewExpense()">
      Create {{ getTypeString() }}
      </button>
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
      item: undefined,
      selected: 'Housing',
      isInputValid: false,
      picked: ''
    }
  },
  props: ['isExpense'],
  methods: {
    ...mapActions([
      'addExpenseItem',
      'addIncomeItem'
    ]),
    isFixed () {
      return this.picked === 'fixed'
    },
    isPercentage () {
      return this.picked === 'percent'
    },
    inputValid () {
      return this.isInputValid && (this.name.length > 0)
    },
    createNewExpense () {
      const newItem = Object.assign({}, this.item, { name: this.name, category: this.selected })
      if (this.isExpense === 'true') {
        this.addExpenseItem(newItem)
      } else {
        this.addIncomeItem(newItem)
      }
    },
    dismiss () {
      this.$emit('close')
    },
    getTypeString () {
      if (this.isExpense === 'true') {
        return 'Expense'
      } else {
        return 'Income'
      }
    },
    itemChange (item, isValid) {
      this.isInputValid = isValid
      this.item = item
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

label {
  font-size: 120%;
  font-weight: 600;
}
</style>
