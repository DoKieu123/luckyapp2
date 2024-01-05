import clientApi from "@/apis/models/clientApi";
export default {
  clientAdd() {
    this.clientadd = !this.clientadd;
  },
  async addNewClient(payload) {
    let rank = "";
    const total = payload.total
    if (total <= 1000000 || total === 0) {
      rank = "Đồng";
      console.log("okiii");
    } else if (1000000 < total <= 2000000) {
      rank = "Bạc";
      console.log("lll");
    } else if (2000000 < total <= 8000000) {
      rank = "vàng";
    } else {
      rank = "Vip";
    }
    const dataClient = {
      id: payload.id,
      name: payload.name,
      number: payload.number,
      total: payload.total,
      rank:rank,
      hidden: payload.hidden,
    };
    try {
      const response = await clientApi.add(dataClient);

      if (response.status === 200) {
        this.client.push(dataClient);
      } else {
        console.log("Error: ", response.console.error);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  },
  async loadClient() {
    try {
      const response = await clientApi.getAll(); // lấy dữ liệu khách hàng đc trên firebase lưu trữ
      const responseData = response.data;
      const clientdata = [];
      for (const key in responseData) {
        const client = {
          code: key,
          id: responseData[key].id,
          name: responseData[key].name,
          number: responseData[key].number,
          hidden: responseData[key].hidden,
          total: responseData[key].total,
          rank: responseData[key].rank,
        };
        clientdata.push(client);
      }
      this.client = clientdata;
    } catch (error) {
      console.error("Error: ", error);
    }
  },
  async seachClient(payload) {
    try {
      const response = await clientApi.getAll(); // lấy dữ liệu khách hàng đc trên firebase lưu trữ
      const responseData = response.data;
      let clientdata = [];

      for (const key in responseData) {
        const client = {
          code: key,
          id: responseData[key].id,
          name: responseData[key].name,
          number: responseData[key].number,
          hidden: responseData[key].hidden,
          total: responseData[key].total,
          rank: responseData[key].rank,
        };
        clientdata.push(client);
      }
      if (payload === null) {
        this.hiddenClient = false
        clientdata.forEach((item) => {
          item.hidden = false;
        });
      } else {
        this.hiddenClient = true
        const payloadArray = Array.from(String(payload));
  
        clientdata.forEach((item) => {
          const itemNumberArray = Array.from(String(item.number));
          let match = true;
  
          if (itemNumberArray.length < payloadArray.length) {
            match = false; // Nếu số ký tự của item.number < số ký tự của payload, không khớp
          } else {
            for (let i = 0; i < payloadArray.length; i++) {
              if (payloadArray[i] !== itemNumberArray[i]) {
                match = false; // Không khớp khi gặp ký tự không giống nhau
                break;
              }
            }
          }
  
          item.hidden = match; // Ẩn nếu không khớp
        });
      }
  
      this.clientdatas = clientdata;
      console.log(this.clientdatas);
    } catch (error) {
      console.error("Error: ", error);
    }
  },
  async selectedClient(payload){
    try{
      const response = await clientApi.getAll();
      const responseData = response.data;
      const clientdata = [];
      for(const key in responseData){
        const client = {
          code: key,
          id: responseData[key].id,
          name: responseData[key].name,
          number: responseData[key].number,
          hidden: responseData[key].hidden,
          total: responseData[key].total,
          rank: responseData[key].rank,
        };
        clientdata.push(client);
      }
      const listSelected = []
      clientdata.forEach((item)=>{
        if(payload === item.code){
          listSelected.push(item)
        }
      })
      this.hiddenClient = false
      this.selectedList = listSelected
    }
    catch (error){
      console.error("Error: ", error);
      // Xử lý lỗi khi tải danh sách sản phẩm
    }
  },
  empty(){
  this.selectedList =[]
  },
  hiddenload(){
    this.hiddenClient = true
  },
  async total(id,total){
    try{
      const response = await clientApi.getAll();
      const responseData = response.data;
      const clientdata = [];
      for(const key in responseData){
        const client = {
          code: key,
          id: responseData[key].id,
          name: responseData[key].name,
          number: responseData[key].number,
          hidden: responseData[key].hidden,
          total: responseData[key].total,
          rank: responseData[key].rank,
        };
        clientdata.push(client);
      }
      const targetClient = clientdata.find(client => client.code === id);

      if (targetClient) {
        // Cập nhật thuộc tính total của đối tượng đó
        targetClient.total += total;
        if (targetClient.total <= 1000000 || targetClient.total === 0) {
          targetClient.rank = "Đồng";
        } else if (1000000 < targetClient.total && targetClient.total <= 2000000) {
          targetClient.rank = "Bạc";
        } else if (2000000 < targetClient.total && targetClient.total <= 8000000) {
          targetClient.rank = "Vàng";
        } else {
          targetClient.rank = "Vip";
        }
        // Gửi yêu cầu cập nhật thông tin lên server
        await clientApi.updateById(id, { total: targetClient.total, rank: targetClient.rank  });
      }
    }
    catch (error){
      console.error("Error: ", error);
      // Xử lý lỗi khi tải danh sách sản phẩm
    }
  }

};
