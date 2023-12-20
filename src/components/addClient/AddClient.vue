<template>
  <baseDailog v-if="clients" @close="listShow">
    <template #default>
      <div id="add-client" @click.stop>
        <h3>
          Thêm Khách Hàng Mới
          <i class="fa-solid fa-mug-hot"></i>
        </h3>
        <form action="" id="addClient" @submit.prevent="formclient">
          <div class="item-client">
            <label for="nameClient">Tên Khách Hàng</label>
            <input
              type="text"
              id="nameClient"
              placeholder="Nhập tên khách hàng"
              v-model="clienteNew.name"
            />
          </div>
          <div class="item-client">
            <label for="number">Số điện thoại</label>
            <input
              type="number"
              v-model="clienteNew.number"
              placeholder="Nhập số điện thoại khách hàng"
            />
          </div>
          <button>THÊM KHÁCH HÀNG</button>
        </form>
      </div>
    </template>
  </baseDailog>
</template>

<script>
import baseDailog from "@/components/UI/baseDailog.vue";
import useClientStore from "@/store/client";
export default {
  data() {
    return {
      showList: true,
      clienteNew: {
        id: "",
        hidden: true,
        name: "",
        number: "",
        total: 0,
        rank: "",
      },
    };
  },
  components: {
    baseDailog,
  },
  computed: {
    clients() {
      return useClientStore().hidden;
    },
  },
  methods: {
    listShow() {
      useClientStore().clientAdd();
    },
    formclient() { 
      this.clienteNew.id = this.generateUniqueId();
      console.log(this.clienteNew);
      useClientStore().addNewClient(this.clienteNew);
      localStorage.setItem("id", JSON.stringify(this.clienteNew.id)); // lưu id mới vào localStorage
    },
    generateUniqueId() {
      const randomNumber = Math.floor(Math.random() * 10000).toString();
      const uniqueId = `client_${randomNumber}`;
      if (uniqueId.length > 12) {
        return uniqueId.slice(0, 12);
      }

      return uniqueId;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#add-client {
  position: fixed;
  top: 95px;
  left: 400px;
  width: 50%;
  background-color: rgb(255, 65, 147);
  color: white;
  h3 {
    width: 60%;
    padding: 10px 20px;
    background-color: white;
    color: rgb(255, 65, 147);
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 50px;
    border-radius: 10px;
  }
  .item-client {
    width: 65%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
    label {
      width: 28%;
      text-align: left;
    }
    input {
      width: 65%;
      height: 35px;
      border: 0px;
      outline: none;
      padding-left: 10px;
      border-radius: 5px;
    }
  }
  button {
    padding: 10px 35px;
    margin-bottom: 30px;
    margin-top: 50px;
    background-color: rgb(231, 205, 153);
    border: 0px;
  }
}
</style>
