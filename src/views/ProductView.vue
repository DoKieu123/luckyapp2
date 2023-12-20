<template>
    <div>
        <HeaderList></HeaderList>
        <LeftItem :titile="product"></LeftItem>
        <ListProduct></ListProduct>

    </div>
</template>

<script>
import HeaderList from '@/components/header/HeaderList.vue';
import LeftItem from '@/components/leftitem/LeftItem.vue';
import ListProduct from '@/components/ListProduct/ListProduct.vue'
    export default {
       components:{
        HeaderList,
        LeftItem,
        ListProduct
       } 
       ,
       data() {
        return {
            product:'Danh sách sản phẩm'
        }
       },
    }
</script>

<style lang="scss" scoped>

</style>