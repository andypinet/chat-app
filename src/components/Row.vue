<template>
    <div :class="{item: true}">
        {{item.name}} {{item.h}}px
    </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
        item: {}
    };
  },
  ready() {
    console.dir(this.item);
  }
}
</script>
<style>
  .item {
    height: 20px;
    background: #c6c6c6;
  }
</style>