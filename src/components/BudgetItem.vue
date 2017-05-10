<template>
    <div>
    <li class="list-group-item">
        <strong>{{ item.name }}</strong>  - {{ item.category }}
        <div id="amount">
          ${{ $store.getters.getAmountForItem(item) }}
          <button class="btn btn-primary" v-on:click="toggleEdit">
            <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          </button>
        </div>
    </li>
    <li class="list-group-item edit" v-if="editMode">
        <div class="form-group row">
          <label for="expense-name-input" class="col-2 col-form-label">Name</label>
          <div class="col-10">
            <input class="form-control" type="text" id="expense-name-input" v-model="name">
          </div>
        </div>
        <div class='form-group row'>
          <label for="expense-category-input" class="col-2 col-form-label">Category</label>
          <div class="col-10">
          <select class="form-control" v-model="category">
            <option v-for="option in $store.state.categories" v-bind:value="option">
            {{ option }}
            </option>
          </select>
          </div>
        </div>
        <hr>
        <label>Type</label>
        <br>
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
        <fixed-budget-item v-on:item="itemChange" v-if="isFixed" v-bind:item="item"></fixed-budget-item>
        <percentage-budget-item v-on:item="itemChange" v-if="isPercentage" v-bind:item="item"></percentage-budget-item>
        <div class="form-group row">
          <button type="button" class="btn btn-primary" :disabled="!inputValid" v-on:click="updateItem2()">
            Update Item
          </button>
        </div>
    </li>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ['item'],
  data: () => {
    return {
      editMode: false,
      picked: '',
      name: '',
      category: '',
      item1: undefined,
      isInputValid: true
    }
  },
  mounted: function () {
    this.picked = (this.item.type === 0) ? 'fixed' : 'percent'
    this.name = this.item.name
    this.category = this.item.category
    this.item1 = this.item
  },
  computed: {
    isFixed () {
      return this.picked === 'fixed'
    },
    isPercentage () {
      return this.picked === 'percent'
    },
    inputValid () {
      return this.isInputValid && (this.name.length > 0)
    }
  },
  methods: {
    ...mapActions([
      'updateItem'
    ]),
    toggleEdit () {
      this.editMode = !this.editMode
    },
    itemChange (item, isValid) {
      this.isInputValid = isValid
      this.item1 = item
    },
    updateItem2 () {
      const newItem = Object.assign({}, this.item1, { name: this.name, category: this.category, id: this.item.id })
      this.updateItem(newItem)
      this.editMode = false
    }
  },
  name: 'budget-item'
}
</script>
<style scoped>
#amount{
  margin-left: auto;
}

.edit {
  display: block;
}
label {
  font-size: 120%;
  font-weight: 600;
}
</style>
