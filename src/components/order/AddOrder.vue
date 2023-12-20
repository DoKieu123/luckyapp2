<template>
  <div class="add-order">
    <ul class="filter-product" >
      <li v-if="hiddenname">
        <span>Tên sản phẩm</span>
        <span>Số lượng</span>
        <span>Giá</span>
      </li>
      <ul class="product-search">
        <li  v-for="search in seachProduct" :key="search.index" :class="{'my-class': search.hiden === false, }" @click="selectedProduct(search.code)" >
          <span>{{ search.name }}</span>
          <span>{{ search.quantity }}</span>
          <span>{{ search.price }}</span>
        </li>
      </ul>
    </ul>
    <div class="add-products">
      <div class="header-product">
        <div class="input-products">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Thêm sản phẩm vào đơn" v-model="nameProduct" @input="search"/>
        </div>
        <ul>
          <li>
            <span>Đơn 1</span>
            <i class="fa-solid fa-xmark"></i>
          </li>
          <li>
            <span>Đơn 2</span>
            <i class="fa-solid fa-xmark"></i>
          </li>
          <li>
            <i class="fa-solid fa-plus"></i>
          </li>
        </ul>
      </div>
      <div class="product-item">
        <div class="not-product" style="display: none">
          <i class="fa-solid fa-box-open"></i>
          <p>Đơn hàng của bạn chưa có sản phẩm nào</p>
        </div>
        <div class="has-product">
          <ul class="title header-name">
            <li>STT</li>
            <li>Mã</li>
            <li>Tên sản phẩm</li>
            <li>Đơn Vị</li>
            <li>Số lượng</li>
            <li>Đơn Giá</li>
            <li>Thành tiền</li>
          </ul>
          <ul>
            <li class="title list-item" v-for="(item,index) in selectedList" :key="item.index">
              <span>{{ index +1}}</span>
              <span class="item-icons" >
                <i class="fa-solid fa-trash"></i>
                <span>{{ item.code }}</span>
              </span >
              <span class="item-icon">{{ item.name }}</span>
              <span class="span-item">hộp</span>
              <span class="input-item">
                <input type="number" v-model="item.selected"></span>
              <span class="span-item">{{item.price}}</span>
              <span class="span-item">{{ item.totalamount }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="client-list">
      <li v-for="client in addClients" :key="client.index" :class="{'none': client.hidden === false}">
        <i class="fa-brands fa-shopify"></i>
        <span>{{ client.name }}</span>
        <span>{{ client.number }}</span>
      </li>
    </ul>
    <div class="add-client">
      <div class="input-client" v-if="hiddenclient">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="number" placeholder="Thêm khách hàng vào đơn" v-model="clientName" @input="searchClients" />
        <button class="client-add" @click="AddClient">
          <i title="Thêm Khách Hàng Mới" class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="client-infor" v-else>
        <div class="none-border">
          <i class="fa-regular fa-user"></i>
          <span>Trần Linh</span>
        </div>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="input-delivery">
        <input type="checkbox" />
        <span>Giao Hàng</span>
      </div>
      <ul class="billing-section">
        <li>
          <p>Tổng Tiền (0 Sản phẩm)</p>
          <span>0</span>
        </li>
        <li>
          <p>Chiết khấu</p>
          <span>0</span>
        </li>
        <li class="bold">
          <p>Khách Phải Trả</p>
          <span>0</span>
        </li>
        <li class="pay">
          <p>Hình Thức Thanh Toán</p>
          <ul class="payments-item">
            <li class="cash">
              <input type="checkbox" />
              Tiền mặt
            </li>
            <li class="transfer">
              <input type="checkbox" />
              Chuyển khoản
            </li>
            <li class="swipe">
              <input type="checkbox" />
              Quẹt thẻ
            </li>
          </ul>
        </li>
        <li class="bold">
          <p>Tiền khách đưa</p>
          <span>0</span>
        </li>
        <li>
          <p>Tiền thừa trả khách</p>
          <span>0</span>
        </li>
        <div class="input-client note">
          <i class="fa-solid fa-pen"></i>
          <input type="text" placeholder="Nhập ghi chú khách hàng" />
        </div>
      </ul>
      <button class="btl-pay">Thanh Toán</button>
    </div>
  </div>
</template>

<script>
import useProductStore from "@/store/product";
import useClientStore from "@/store/client";
export default {
  data() {
    return {
      nameProduct: '',
      clientName: null,
      hiddenclient: true
    }
  },
  computed: {
    seachProduct(){
      return useProductStore().allproductSearch
    },
    hiddenname(){
      return useProductStore().hidden
    },
    selectedList(){
      return useProductStore().listSearch
    },
    addClients(){
      return useClientStore().clientSearch
    }

  },
  watch: {
    selectedList: {
      deep: true,
      handler(newValue) {
        // Xử lý khi selectedList thay đổi
        newValue.forEach(item => {
          item.totalamount = item.selected * item.price;
          item.inventory = item.quantity - item.selected
        });
      }
    },
  },
  methods: {
    AddClient() {
      useClientStore().clientAdd();
    },
    search(){
      useProductStore().seachName(this.nameProduct);
      console.log(this.hiddenname);
    },
    selectedProduct(code){
      useProductStore().selected(code, this.selected)
    },
    searchClients(){
      useClientStore().seachClient(this.clientName)
      console.log(this.clientName);
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
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.filter-product {
  display: block;
  position: fixed;
  top: 150px;
  left: 50px;
  .my-class{
      display: none;
    }
  li {
    width: 640px;
    padding: 15px 10px;
    background-color: #f67cad !important;
    border-bottom: 2px solid white;
    display: flex;
    justify-content: space-between;
    span {
      color: white;
      width: 130px;
    }
  }
  .product-search {
    li {
      border-radius: 10px;
      background-color: #f6abca !important;
    }
    span {
      padding: 8px 12px;
      border: 1px solid white;
      border-radius: 10px 30px 10px 30px;
    }
  }
}
.add-order {
  margin-top: 79px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 211, 218);
  .header-product {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    background-color: pink;
    ul {
      display: flex;
      width: 60%;
      li {
        background-color: white;
        margin: 0px 3px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 10px;
        i {
          margin: 0px 5px;
        }
        .fa-xmark {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3px 5px;
          border-radius: 50%;
          background-color: pink;
          color: white;
        }
      }
    }
  }
}
.add-products {
  width: 67%;
  background-color: white;
  margin: 7px;
  .not-product {
    i {
      font-size: 80px;
      margin-bottom: 10px;
      color: #f1a5c4;
    }
    font-size: 20px;
    margin-top: 170px;
    opacity: 0.5;
  }
  .has-product {
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .header-name {
      font-weight: 600;
      background-color: #f1f0ed;
      box-shadow: 1px 3px 7px 0px #888888;
      padding: 20px 10px;
    }
    .list-item {
      padding: 23px 10px;
      margin: 10px auto;
      width: 97%;
      border: 2px solid rgb(254, 159, 191);
      border-radius: 10px;
      text-align: left;
      i {
        color: rgb(255, 141, 160);
        margin-right: 10px;
      }
      .span-item{
        width: 55px;
      }
      .item-icons{
        width: 70px;
      }
      .input-item{
        input{
          width: 60px;
          margin: 0px auto;
        }
      }
      .item-icon{
        width: 90px;
      }
      span:nth-child(4) {
        padding-right: 50px;
      }
    }
  }
}
.client-add {
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 0px;
}
.btl-pay {
  margin: 0 auto;
  padding: 12px 70px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #fe799c;
  border: 0px;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: end;
  box-shadow: 5px 8px 5px rgba(21, 21, 21, 0.1);
}
.client-list{
  position: fixed;
  top: 150px;
  right: 50px;
  background-color: #f1a5c4;
  width: 390px;
  padding: 20px 0px;
  border-radius: 5px;
  li{
    width: 350px;
    margin: 0 auto;
    background-color: #f1a5c4;
    padding: 8px 0px;
    border: 2px solid white;
    color: white;
    border-radius: 20px 5px 20px 5px;
    margin-bottom: 8px;
    span{
      margin-left: 15px;
    }
  }
  .none{
    display: none !important;
  }
}
.add-client:not(.btl-pay) {
  width: 32%;
  padding: 0px 15px;
  background-color: white;
  margin: 7px;
  text-align: left;
  font-size: 18px;
  div {
    border-bottom: 1px solid pink;
    width: 100%;
  }
  .bold {
    font-weight: 700;
    font-size: 19px;
  }
  .client-infor{
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    span{
      color: #fc77ac;
      margin-left: 8px;
    }
    .none-border{
      border: none;
    }
    .fa-xmark{
      border-radius: 50%;
      border: 1px solid black;
      padding-top: 4px !important;
      padding: 0px 5px;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .input-delivery {
    padding: 7px 0px;
    input {
      margin-right: 15px;
    }
  }
  .billing-section {
    li:not(.pay) {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
    }
    .note {
      margin-top: 60px;
    }
    .payments-item {
      justify-content: center;
      padding: 5px 0px;
      li {
        color: white;
        margin: 0px 5px;
        padding: 5px 6px;
        border-radius: 10px;
        input {
          margin-right: 3px;
        }
      }
      .cash {
        background-color: #fc77ac;
      }
      .transfer {
        background-color: #fd9cc4;
      }
      .swipe {
        background-color: #ffb0d7;
      }
    }
    .payments-item {
      display: flex;
    }
  }
  .input-client {
    margin-top: 15px;
    font-size: 18px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 5px;
    font-size: 20px;
    i {
      width: 10%;
    }
    input {
      width: 90%;
      height: 37px;
      border: none;
      margin-right: 2px;
      outline: none;
    }
    .fa-plus {
      cursor: pointer;
    }
    .fa-plus:hover {
      font-size: 25px;
      color: pink;
    }
  }
}
.input-products {
  width: 350px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid pink;
  background-color: white;
  i {
    width: 10%;
  }
  input {
    width: 90%;
    height: 37px;
    border: none;
    margin-right: 2px;
    outline: none;
  }
  
}
</style>
