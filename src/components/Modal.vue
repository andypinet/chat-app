<template>
    <div>
        <div class="bar bar-header choujiang">
            <h1 class="title"></h1>
            <button class="button button-icon icon ion-ios-close-empty positive" @click="close()"></button>
        </div>

        <about></about>
    </div>
</template>
<script>
  import About from "./About";

  export default {
    components: {
        About
    },
    data() {
      return {
        items: []
      }
    },
    ready() {
    },
    methods: {
      close() {
        $vonicModal.hide()
      }
    }
  }
</script>