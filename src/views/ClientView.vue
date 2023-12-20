<template>
    <div>
        <HeaderList></HeaderList>
        <LeftItem :titile="client" ></LeftItem>
        <ClientList></ClientList>
        
    </div>
</template>

<script>
 import HeaderList from '@/components/header/HeaderList.vue';
 import LeftItem from '@/components/leftitem/LeftItem.vue'; 
 import ClientList from '@/components/client/ClientList.vue'
    export default {
            data() {
                return {
                    client:'Danh sách khách hàng'
                }
            },
            components:{
                HeaderList,
                LeftItem,
                ClientList,
            }
        }
    
</script>

<style lang="scss" scoped>

</style>