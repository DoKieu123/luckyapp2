import productApi from "@/apis/models/productApi";

export default {
  async addProduct(payload) {
    const dataProduct = {
      imageUrl: payload.imageUrl,
      code: payload.code,
      name: payload.name,
      price: payload.price,
      quantity: payload.quantity,
      status: payload.status,
      hiden: payload.hiden,
      currentDate: payload.currentDate,
      selected: payload.selected,
    };

    try {
      const response = await productApi.add(dataProduct);

      if (response.status === 200) {
        // Thêm sản phẩm mới vào danh sách
        this.product.push(dataProduct);
      } else {
        console.log("Error: ", response.error);
        // Xử lý thông báo lỗi hoặc các hành động phù hợp khác
      }
    } catch (error) {
      console.error("Error: ", error);
      // Xử lý lỗi trong quá trình thêm sản phẩm
    }
  },
  async loadProduct(keysearch, datesearch, statussearch) {
    try {
      const response = await productApi.getAll();
      const responseData = response.data;
      let productsdata = [];

      for (const key in responseData) {
        const quantity = responseData[key].quantity;
        const status = quantity <= 0 ? "Ngừng bán" : "Đang bán"; // Kiểm tra quantity và gán giá trị cho status
        const products = {
          id: key,
          imageUrl: responseData[key].imageUrl,
          code: responseData[key].code,
          name: responseData[key].name,
          price: responseData[key].price,
          quantity: responseData[key].quantity,
          status: status,
          hiden: responseData[key].hiden,
          currentDate: responseData[key].currentDate,
          selected: responseData[key].selected,
        };
        productsdata.push(products);
      }
      // this.product = productsdata; // Cập nhật danh sách sản phẩm
      if (datesearch !== "") {
        productsdata.forEach((item) => {
          if (
            !item.currentDate.toLowerCase().includes(datesearch.toLowerCase())
          ) {
            item.hiden = false;
          } else {
            item.hiden = true;
          }
        });
      }

      // Kiểm tra keysearch
      if (keysearch !== "") {
        productsdata.forEach((item) => {
          if (!item.code.toLowerCase().includes(keysearch.toLowerCase())) {
            item.hiden = false;
          } else {
            item.hiden = true;
          }
        });
      }
      // Kiểm tra statussearch
      if (statussearch !== "") {
        productsdata.forEach((item) => {
          if (!item.code.toLowerCase().includes(statussearch.toLowerCase())) {
            item.hiden = false;
          } else {
            item.hiden = true;
          }
        });
      }
      this.product = productsdata; // Cập nhật danh sách sản phẩm
      console.log(productsdata);
    } catch (error) {
      console.error("Error: ", error);
      // Xử lý lỗi khi tải danh sách sản phẩm
    }
  },
  async seachName(payload) {
    try {
      const response = await productApi.getAll();
      const responseData = response.data;
      let productsdata = [];

      for (const key in responseData) {
        const quantity = responseData[key].quantity;
        const status = quantity <= 0 ? "Ngừng bán" : "Đang bán"; // Kiểm tra quantity và gán giá trị cho status
        const products = {
          id: key,
          imageUrl: responseData[key].imageUrl,
          code: responseData[key].code,
          name: responseData[key].name,
          price: responseData[key].price,
          quantity: responseData[key].quantity,
          status: status,
          hiden: responseData[key].hiden,
          currentDate: responseData[key].currentDate,
          selected: responseData[key].selected,
        };
        productsdata.push(products);
      }
      // this.product = productsdata; // Cập nhật danh sách sản phẩm
      if (payload === "") {
        this.hiddenSearch = false;
        productsdata.forEach((item) => {
          item.hiden = false;
        });
      } else {
        this.hiddenSearch = true;
        productsdata.forEach((item) => {
          if (!item.name.toLowerCase().includes(payload.toLowerCase())) {
            item.hiden = false;
          } else {
            item.hiden = true;
          }
        });
      }
      this.productSearch = productsdata; // Cập nhật danh sách sản phẩm
      console.log(productsdata);
    } catch (error) {
      console.error("Error: ", error);
      // Xử lý lỗi khi tải danh sách sản phẩm
    }
  },
  async selected(payload) {
    try {
      const response = await productApi.getAll();
      const responseData = response.data;
      let productsdata = [];

      for (const key in responseData) {
        const quantity = responseData[key].quantity;
        const status = quantity <= 0 ? "Ngừng bán" : "Đang bán"; // Kiểm tra quantity và gán giá trị cho status
        const products = {
          id: key,
          imageUrl: responseData[key].imageUrl,
          code: responseData[key].code,
          name: responseData[key].name,
          price: responseData[key].price,
          quantity: responseData[key].quantity,
          status: status,
          hiden: responseData[key].hiden,
          currentDate: responseData[key].currentDate,
          selected: responseData[key].selected,
          inventory: responseData[key].quantity - responseData[key].selected, // Tính toán inventory
          totalamount: responseData[key].selected * responseData[key].price // Tính toán totalamount
        };
        productsdata.push(products);
      }
      const arraySelected = []
      productsdata.forEach((item)=>{
        if( item.code === payload){
          arraySelected.push(item)
        }
        
      }) 
      console.log(arraySelected);
      this.selectedProduct.push(...arraySelected);// Cập nhật danh sách sản phẩm được chọn
      console.log(this.selectedProduct);
    } catch (error) {
      console.error("Error: ", error);
      // Xử lý lỗi khi tải danh sách sản phẩm
    }
  },
  empty(){
    this.selectedProduct =[]
  }
};
