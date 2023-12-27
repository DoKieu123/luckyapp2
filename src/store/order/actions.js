import orderApi from "@/apis/models/orderApi";
export default {
  async addOrders(payload, payloads, payloades) {
    const dataOrder = {
      listProduct: payload,
      client: payloads,
      id: payloades.id,
      totaAmount: payloades.totaAmount,
      discount: payloades.discount,
      amountToPay: payloades.amountToPay,
      moneyGiven: payloades.moneyGiven,
      exchange: payloades.exchange,
      totalItems: payloades.totalItems,
      method: payloades.method,
      currentDate: payloades.currentDate,
      formattedDate: payloades.formattedDate,
    };

    try {
      const response = await orderApi.add(dataOrder);

      if (response.status === 200) {
        // Thêm sản phẩm mới vào danh sách
        this.orders.push(dataOrder);
      } else {
        console.log("Error: ", response.error);
        // Xử lý thông báo lỗi hoặc các hành động phù hợp khác
      }
    } catch (error) {
      console.error("Error: ", error);
      // Xử lý lỗi trong quá trình thêm sản phẩm
    }
  },
  async loadOrder() {
    try {
      const response = await orderApi.getAll(); // lấy dữ liệu khách hàng đc trên firebase lưu trữ
      const responseData = response.data;
      const Orderdata = [];
      for (const key in responseData) {
        const order = {
          id: responseData[key].id,
          listProduct: responseData[key].listProduct,
          client: responseData[key].client,
          totaAmount: responseData[key].totaAmount,
          discount: responseData[key].discount,
          amountToPay: responseData[key].amountToPay,
          moneyGiven: responseData[key].moneyGiven,
          exchange: responseData[key].exchange,
          totalItems: responseData[key].totalItems,
          method: responseData[key].method,
          currentDate: responseData[key].currentDate,
          formattedDate: responseData[key].formattedDate,
        };
        Orderdata.push(order);
      }
      this.orders = Orderdata;
      console.log(this.orders);
    } catch (error) {
      console.error("Error: ", error);
    }
  },
  async OrderSelected(payload) {
  try {
    const response = await orderApi.getAll(); // lấy dữ liệu khách hàng đc trên firebase lưu trữ
    const responseData = response.data;
    const Orderdata = [];
    for (const key in responseData) {
      const order = {
        id: responseData[key].id,
        listProduct: responseData[key].listProduct,
        client: responseData[key].client,
        totaAmount: responseData[key].totaAmount,
        discount: responseData[key].discount,
        amountToPay: responseData[key].amountToPay,
        moneyGiven: responseData[key].moneyGiven,
        exchange: responseData[key].exchange,
        totalItems: responseData[key].totalItems,
        method: responseData[key].method,
        currentDate: responseData[key].currentDate,
        formattedDate: responseData[key].formattedDate,
      };
      Orderdata.push(order);
    }
    this.orders = Orderdata;
    console.log(this.orders);
    console.log(payload);
    this.orders.forEach((item)=>{
      if(payload === item.id){
        this.billOrder.push(item)
      }
    })
    console.log(this.billOrder);
    
  } catch (error) {
    console.error("Error: ", error);
  }
  },
  hidden() {
    this.hiddenBill = true;
  },
};
