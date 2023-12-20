<template>
  <div>
    <div class="item-order">
      <router-link to="/newproduct" class="btn-order">
        <i class="fa-solid fa-plus"></i>
        Thêm sản phẩm
      </router-link>
      <div class="body-order">
        <ul class="item-titile">
          <li class="item-chone">Tất cả sản phẩm</li>
        </ul>
        <ul class="item-filter">
          <span class="titile-filter">
            <i class="fa-solid fa-filter"></i>
            Bộ Lọc
          </span>
          <li class="item-code">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="tìm kiếm theo mã" v-model="keysearch" @input="searchcode" />
          </li>
          <ul class="filter-selected">
            <li>
              <label for="date">Ngày Tạo</label>
              <input type="date" id="date" v-model="date" @change="searchdate" />
            </li>
            <li class="status-filter">
              <span @click="hiddenselected" :class="{ status: block === true }"
                >Trạng Thái <i class="fa-solid fa-caret-up fa-rotate-90"></i>
              </span>
              <input type="text" :class="{ selected: block === false }" v-model="selected" @change="searchSelected" />

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
          <li>ảnh</li>
          <li>Mã</li>
          <li>Tên sản phẩm</li>
          <li>Trạng thái</li>
          <li>giá bán</li>
          <li>số lượng</li>
          <li>Thao tác</li>
        </ul>
        <ul class="item-orders">
          <li v-for="product in products" :key="product.code" :class="{ 'none': product.status === 'Ngừng bán','my-class': product.hiden === false, }">
            <i class="fa-solid fa-cloud"></i>
            <input type="checkbox" />
            <span>
              <img :src="product.imageUrl" alt="" />
            </span>
            <span>{{ product.code }}</span>
            <span>{{ product.name }} </span>
            <span>{{ product.status }}</span>
            <span>{{ product.price }}</span>
            <span>{{ product.quantity }}</span>
            <ul class="btn-operation">
              <button>
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button><i class="fa-solid fa-trash-can"></i></button>
              <button><i class="fa-solid fa-wrench"></i></button>
            </ul>
          </li>
          <button class="block" @click="displayProducts">
            <div v-if="display">Thu nhỏ <i class="fa-solid fa-caret-up"></i></div>
           <div v-else> Hiện thị <i class="fa-solid fa-caret-up fa-rotate-180"></i></div>   
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import useProductStore from "@/store/product";
export default {
  data() {
    return {
      selected: '',
      options: ["Đang bán","Ngừng bán"],
      hidden: false,
      block: true,
      display:false,
      titile: "Danh sách đơn hàng",
      keysearch:'',
      date:'',
      caret:true
    };
  },
  created() {
    useProductStore().loadProduct(this.keysearch,this.date,this.selected);
  },
  computed: {
    products() {
      return useProductStore().allproduct;
    },
  },
  methods: {
    hiddenselected() {
      this.hidden = !this.hidden;
    },
    select(option) {
      this.hidden = !this.hidden;
      this.selected = option;
      this.block = false;
      console.log(this.selected);
    },
    displayProducts(){
    useProductStore().loadProduct(this.keysearch,this.date,this.selected)
        this.display = !this.display
  }
  ,searchcode(){
    useProductStore().loadProduct(this.keysearch,this.date,this.selected)
   
  }
  ,searchdate(){
    useProductStore().loadProduct(this.keysearch,this.date,this.selected)
  
   
  },
  searchSelected(){
    useProductStore().loadProduct(this.keysearch,this.date,this.selected)
    console.log(this.selected);
    
  }
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
.item-order {
  position: fixed;
  top:0px;
  padding: 20px;
  width: 75%;
  margin-left: 23%;
  margin-top: 80px;
  .btn-order {
    position: fixed;
    top: 89px;
    right: 30px;
    padding: 10px 37px;
    margin-left: 700px;
    border: 0px;
    background-color: #ffdbaa;
    color: white;
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
  margin-top: 50px;
  margin-left: 20px;
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
    li:hover {
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
          width: 180px;
        }
        .status {
          padding-right: 0px;
        }
        input{
          width: 180px;
          outline: none;
          border: 0px;
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
    span:first-of-type {
      margin-right: 30px;
    }
  }
  .item-orders {
     padding-top: 5px;
    overflow: auto;
    height: 240px;
    width: 100%;
    margin-left: 0px;
    border: 2px solid pink;
    border-radius: 0px 0px 5px 5px;
    li {
      width: 96%;
      margin:7px auto;
      display: flex;
      align-items: center;
      border: 2px solid rgb(192, 194, 194);
      color: rgb(255, 85, 113);
      border-radius: 10px;
      padding: 8px 5px;
      
      input {
        margin-left: 28px;
      }
      span {
        width: 148px;
        img {
          width: 55px;
          height: 40px;
        }
      }
      i {
        width: 30px;
        padding-left: 15px;
      }
    }
    .btn-operation {
      display: flex;
      button {
        width: 40px;
        margin: 3px;
        display: flex;
        justify-content: center;
        border: 0px;
        background-color: #ffdbaa;
        color: rgb(250, 245, 245);
        border-radius: 10px;
        i {
          display: flex;
          justify-content: center;
          padding: 5px 3px;
        }
      }
    }
    .block {
      position: absolute;
      color: white;
      background-color: rgb(255, 116, 137);
      padding: 5px;
      border-radius: 5px;
      right: 45px;
      bottom: 2px;
      i {
        margin-left: 5px;
      }
    }
    .none{
      opacity: 0.4;
    }
    .my-class{
      display: none;
    }
    
  }
}
</style>
