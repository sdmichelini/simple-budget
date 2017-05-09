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
            <input class="form-control" type="text" id="expense-name-input">
          </div>
        </div>
        <div class='form-group row'>
          <label for="expense-category-input" class="col-2 col-form-label">Category</label>
          <div class="col-10">
          <select class="form-control">
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
        <fixed-budget-item v-if="isFixed()"></fixed-budget-item>
        <percentage-budget-item v-if="isPercentage()"></percentage-budget-item>
        <div class="form-group row">
          <button type="button" class="btn btn-primary">
            Update Item
          </button>
        </div>
    </li>
    </div>
</template>
<script>
export default {
  data: () => {
    return {
      editMode: false,
      picked: ''
    }
  },
  methods: {
    toggleEdit () {
      this.editMode = !this.editMode
    },
    isFixed () {
      return this.picked === 'fixed'
    },
    isPercentage () {
      return this.picked === 'percent'
    }
  },
  name: 'budget-item',
  props: ['item']
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
