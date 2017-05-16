<template>
<div>
  <h1>Categories</h1>
  <ul>
    <li v-for="category in $store.state.categories">{{ category }}</li>
  </ul>
  <h3>Create New Category</h3>
  <div class="form-group row">
    <label for="expense-name-input" class="col-2 col-form-label">Name</label>
    <div class="col-10">
      <input class="form-control" v-model="name" type="text" placeholder="Type a Name" id="category-name-input">
    </div>
  </div>
  <button type="button" class="btn btn-success" :disabled="name.length == 0" v-on:click="add">
    Create Category
  </button>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'categories',
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions([
      'addCategory'
    ]),
    add () {
      this.addCategory(this.name)
      this.name = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
