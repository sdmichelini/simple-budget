<template>
    <li class="list-group-item">
      <strong>{{ item.name }}</strong>  - {{ item.category }}
      <div id="amount">${{ $store.getters.getAmountForItem(item) }}</div>
    </li>
</template>
<script>
export default {
  name: 'budget-item',
  props: ['item']
}
</script>
<style>
#amount{
  margin-left: auto;
}
</style>
