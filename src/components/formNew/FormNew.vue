<template>
  <div id="form-product">
    <form action="" id="newproduct" @submit.prevent="addProduct">
      <div class="file-img conten-item">
        <label for="img">ảnh sản phẩm</label>
        <input
          id="img"
          type="file"
          @change="handleFileChange"
          ref="fileInput"
          placeholder="okiii"
        />
        <img
          v-if="dataProduct.imageUrl"
          :src="dataProduct.imageUrl"
          alt=""
          class="img-product"
        />
      </div>
      <div class="conten-product conten-item">
        <div class="product-titile">
          <label for="code"> Mã sản phẩm</label>
          <input type="text" class="input-item" v-model="dataProduct.code" />
        </div>
        <div class="product-titile">
          <label for="name">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            id="name"
            class="input-item"
            v-model="dataProduct.name"
          />
        </div>
        <div class="product-titile">
          <label for="">Giá sản phẩm</label>
          <input type="number" class="input-item" v-model="dataProduct.price" />
        </div>
        <div class="product-titile">
          <label for="">Số lượng</label>
          <input
            type="number"
            class="input-item"
            v-model="dataProduct.quantity"
          />
        </div>
        <div class="status">
          <p>Trạng Thái</p>
          <div>
            <label for="buy">Hàng bán</label>
            <input
              name="status"
              id="buy"
              type="radio"
              class="input-item"
              v-model="dataProduct.status"
              value="Đang bán"
            />
            <label for="stop">Không bán</label>
            <input
              name="status"
              id="stop"
              type="radio"
              class="input-item"
              value="Ngừng bán"
              v-model="dataProduct.status"
            />
          </div>
        </div>
      </div>
      <p class="note" v-if="valuecheck">{{ valuecheck[check] }}</p>
      <button class="btn-add">Thêm sản phẩm</button>
    </form>
  </div>
</template>

<script>
import useProductStore from "@/store/product";
export default {
  data() {
    return {
      dataProduct: {
        imageFile: null,
        imageUrl: "",
        code: "",
        name: "",
        price: null,
        quantity: null,
        status: "",
        selected: 1,
        currentDate: new Date(),
        hiden: true,
      },
      valuecheck: [
        "xin hãy nhập đủ dữ liệu !",
        "giá tiền phải lớn hơn 0 !",
        "số lượng phải lớn hơn 0 !",
      ],
      check: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]; // Chỉ lấy file đầu tiên
      if (file) {
        this.dataProduct.imageFile = file; // Lưu trữ file hình ảnh
        this.previewImage(file); // Gọi hàm để hiển thị ảnh
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.dataProduct.imageUrl = reader.result; // Lưu đường dẫn của hình ảnh để hiển thị
      };
      reader.readAsDataURL(file); // Đọc file và chuyển đổi thành đường dẫn dạng base64
    },
    addProduct() {
      if (
        !this.dataProduct.code ||
        !this.dataProduct.name ||
        !this.dataProduct.price ||
        !this.dataProduct.quantity ||
        !this.dataProduct.status
      ) {
        this.check = 0;
        return; // Prevent form submission
      }

      // Check price and quantity
      if (this.dataProduct.price <= 0) {
        this.check = 1;
        return; // Prevent form submission
      }
      if (this.dataProduct.quantity <= 0) {
        this.check = 2;
        return; // Prevent form submission
      }
      useProductStore().addProduct(this.dataProduct);
      this.$router.replace("/product");
      this.check = null;
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
#form-product {
  margin-top: 90px;
}
#newproduct {
  font-size: 18px;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px 30px;
  color: white;
  border-radius: 50px;
  .conten-item {
    background-color: #ffc0d9;
  }

  .file-img {
    display: flex;
    width: 80%;
    margin: 0 auto;
    height: 120px;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    .btn-img {
      position: absolute;
      background-color: blue;
      top: 0;
      left: 50%;
    }
    input {
      width: 70px;
      margin: 0 30px;
      align-items: center;
    }
    .img-product {
      width: 100px;
    }
  }
  .conten-product {
    width: 80%;
    margin: 30px auto;
    padding: 20px 30px;
    border-radius: 50px;
    .product-titile {
      margin-bottom: 18px;
      display: flex;
      justify-content: center;
      label {
        width: 150px;
        text-align: left;
      }
      .input-item {
        width: 250px;
        height: 26px;
        border: 0px;
        border-radius: 10px;
        outline: none;
      }
    }
    .right-titile {
      margin-left: 75px;
    }
  }
  .btn-add {
    padding: 12px 50px;
    font-size: 18px;
    background-color: #8acdd7;
    border: 0px;
    color: white;
    border-radius: 2px;
  }
  .status {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    input {
      padding: 7px;
    }
  }
  .note {
    height: 29px;
    width: 300px;
    color: red;
    margin: 0 auto;
    align-items: center;
  }
}
</style>
