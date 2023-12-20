<template>
  <div class="about">
    <HeaderList></HeaderList>
    <TitleOrder></TitleOrder>
    
  </div>
</template>
<script>
import TitleOrder from '@/components/ListOrder/TitleOrder.vue'
import HeaderList from '@/components/header/HeaderList.vue';
export default {
  name: "OrderView",
  components: {
    TitleOrder,
    HeaderList,
  },
};
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>