<template>
    <div class="page" v-nav="{ title: 'vlist' }">
        <div class="page-content">
            <vue-virtual-list :items="items" :child-component="childComponent"></vue-virtual-list>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import VueVirtualList from './Vlist'
    import Row from './Row.vue'

    var ret = {};

    export default{
        components: {
            VueVirtualList,
            Row
        },
        data(){
            var items = []
            for (var i = 0; i < 50; i++) {
              items.push({name: 'item' + i, h: 20})
            }

            ret = {
              items: items,
              childComponent: Row,
            }
            return ret;
        }
    }
</script>
