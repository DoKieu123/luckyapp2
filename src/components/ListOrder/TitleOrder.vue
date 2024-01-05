<template>
  <div class="order-list">
    <LeftItem :titile="titile"></LeftItem>
    <div class="item-orders">
      <router-link to="/" class="btn-order">
        <i class="fa-solid fa-plus"></i>
        Tạo đơn hàng
      </router-link>
      <div class="body-order">
        <ul class="item-titile">
          <li class="item-chone">Tất cả đơn hàng</li>
          <li>Đang giao dịch</li>
          <li>Đơn xử lý</li>
          <li>Đơn đã hủy</li>
        </ul>
        <ul class="item-filter">
          <span class="titile-filter">
            <i class="fa-solid fa-filter"></i>
            Bộ Lọc
          </span>
          <li class="item-code">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="tìm kiếm theo mã" />
          </li>
          <ul class="filter-selected">
            <li>
              <label for="date">Ngày Tạo</label>
              <input type="date" id="date" />
            </li>
            <li class="status-filter">
              <span @click="hiddenselected" :class="{ status: block === true }"
                >Trạng Thái <i class="fa-solid fa-caret-up fa-rotate-90"></i>
              </span>
              <span :class="{ selected: block === false }">{{ selected }}</span>

              <ul v-if="hidden">
                <li
                  v-for="option in options"
                  :key="option.index"
                  @click="select(option)"
                >
                  {{ option }}
                </li>
              </ul>
            </li>
          </ul>
        </ul>
        <ul class="item-list">
          <span><i class="fa-solid fa-gear"></i></span>
          <span>
            <input type="checkbox" />
          </span>
          <li>Mã đơn hàng</li>
          <li>Ngày tạo đơn</li>
          <li>Tên khách hàng</li>
          <li>Trạng thái hàng</li>
          <li>Khách Phải trả</li>
          <li>
            Thao tác
          </li>
        </ul>
        <ul class="item-order">
          <li v-for="order in listOrder" :key="order.index">
            <span class="item-column">
              <i class="fa-solid fa-cloud"></i>
              <input type="checkbox" />
            </span>
            <span class="item-column">{{ order.id }}</span>
            <span class="item-columns"
              >{{ order.formattedDate}}</span
            >
            <span class="item-columns" v-for="client in order.client" :key="client.index" >{{ client.name }}</span>
            <span class="item-columns">{{ order.method }}</span>
            <span class="item-column">{{ order.amountToPay }}</span>
            <ul  class="btn-operation item-columns" >
              <button>
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button><i class="fa-solid fa-trash-can"></i> </button>
              <button><i class="fa-solid fa-wrench"></i></button>
            </ul>
          </li>
          <div class="block">
            Hiện thị <i class="fa-solid fa-caret-up fa-rotate-180"></i>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import useOrderStore from '@/store/order';
import LeftItem from '@/components/leftitem/LeftItem.vue'
export default {
  components:{
    LeftItem,
  },
  data() {
    return {
      selected: null,
      options: ["Hoàn Thành", "Chưa Hoàn Thành"],
      hidden: false,
      block: true,
      titile: 'Danh sách đơn hàng'
    };
  },
  created(){
    useOrderStore().loadOrder()
  },
  methods: {
    hiddenselected() {
      this.hidden = !this.hidden;
    },
    select(option) {
      this.hidden = !this.hidden;
      this.selected = option;
      this.block = false;
    },
  },
  computed:{
    listOrder(){
      return useOrderStore(). ALLOrder
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.order-list {
  display: flex;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}

.item-orders {
  padding: 20px;
  width: 75%;
  margin-left: 23%;
  position: fixed;
  top: 75px;
  right: 8px;
  


  .btn-order {
    padding: 10px 37px;
    margin-left: 800px;
    border: 0px;
    background-color: #FFDBAA;
    color:white;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px rgb(189, 188, 188);
    cursor: pointer;
    i {
      margin-right: 5px;
      border-radius: 50%;
      background-color: white;
      padding: 5px 6px;
      color: pink;
    }
  }
}
.body-order {
  width: 99%;
  margin: 0 auto;
  padding: 0px 0px;
  margin-top: 30px;

  .item-titile {
    display: flex;
    background-color: pink;
    border-radius: 2px;
    border-radius: 5px 5px 0px 0px;
   
    li {
      padding: 20px 30px;
      color: white;
      font-size: 18px;
    }
    .item-chone {
      border-bottom: 5px solid rgb(255, 103, 128);
      color: rgb(255, 103, 128);
    }
  }
  .item-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    margin-top: 20px;
    margin-bottom: 30px;
    
    .titile-filter {
      i {
        color: rgb(253, 128, 149);
        margin-right: 10px;
      }
    }

    .item-code {
      border: 2px solid pink;
      color: pink;
      padding: 0px 5px;
      border-radius: 5px;
      i {
        color: pink;
        margin-right: 10px;
      }
      input {
        width: 230px;
        height: 40px;
        font-size: 18px;
        border: 0px;
        outline: none;
      }
    }
    .filter-selected {
      height: 45px;
      border: 2px solid pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
      li {
        margin-left: 15px;
        padding: 0px 15px;
        input {
          margin-left: 10px;
        }
      }
      .status-filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .selected {
          width: 190px;
        }
        .status {
          padding-right: 190px;
        }
        ul {
          padding: 10px 5px;
          position: absolute;
          width: 190px;
          top: 0px;
          left: 120px;
          text-align: left;
          border-radius: 50px;
          background-color: #cffdf3;
          li {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .item-list {
    display: flex;
    margin-top: 20px;
    background-color: pink;
    padding: 15px 35px;
    color: white;
    li {
      font-weight: 500;
      width: 155px;
    }
    span:first-of-type{
      margin-right: 30px;
    }
  }
  .item-order{
    width: 100%;
    margin-left: 0px;
    border: 2px solid pink;
    border-radius: 0px 0px 5px 5px;
    height: 250px;
    overflow: auto;
    li{
      width: 97%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 2px solid rgb(255, 116, 139);
      color: rgb(255, 85, 113);
      border-radius: 10px;
      padding: 15px 0px ;
      margin-bottom: 10px;
      margin-top: 10px;
      input{
        margin-left: 28px;
      }
      span{
        width: 148px;
      }
      i{
        width: 30px;
        padding-left: 15px;
      }
      .item-column{
        max-width: 9%;
      }
      .item-columns{
        max-width: 14%;
      }
    }
    .btn-operation{
      display: flex;
      button{
       width: 40px;
       margin: 3px;
       display: flex;
       justify-content: center;
       border: 0px;
       background-color: #FFDBAA;
       color: rgb(250, 245, 245);
       border-radius: 10px;
       i{
        display: flex;
        justify-content: center;
        padding: 5px 3px;
       }
      }
    }
    .block{
      position: absolute;
      color: white;
      background-color: rgb(255, 116, 137);
      padding: 5px;
      border-radius: 5px;
      right: 80px;
      i{
        margin-left: 5px;
      }
    }
  }
}
</style>
