<template>
  <div class="home">
  <HeaderList></HeaderList>
  <AddOrder></AddOrder>
  <AddClient></AddClient>
  </div>
</template>

<script>
import HeaderList from '@/components/header/HeaderList.vue';
import AddOrder from '@/components/order/AddOrder.vue'
import AddClient from '@/components/addClient/AddClient.vue'
export default {
  name: "HomeView",
  data() {
    return {
    
    }
  },
  components: {
   HeaderList,
   AddOrder,
   AddClient
  },
  methods:{
   
  }
};
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
