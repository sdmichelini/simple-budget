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
        <option v-for="option in $store.state.categories" v-bind:value="option">
        {{ option }}
        </option>
      </select>
      </div>
    </div>
    <!---Strategy goes here-->
    <fixed-budget-item v-on:item="itemChange"></fixed-budget-item>
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
      isInputValid: false
    }
  },
  props: ['isExpense'],
  methods: {
    ...mapActions([
      'addExpenseItem',
      'addIncomeItem'
    ]),
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
</style>
