<template>
    <div>
        <div class="bar bar-header choujiang">
            <h1 class="title"></h1>
            <button class="button button-icon icon ion-ios-close-empty positive" @click="close()"></button>
        </div>

        <result></result>
    </div>
</template>
<script>
  import Result from "./Result";

  export default {
    components: {
        Result
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