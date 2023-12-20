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
          id: responseData[key].id,
          name: responseData[key].name,
          number: responseData[key].number,
          hidden: responseData[key].hidden,
          total: responseData[key].total,
          rank: responseData[key].rank,
        };
        clientdata.push(client);
      }
      if (payload === "") {
        clientdata.forEach((item) => {
          item.hidden = false;
        });
      } else {
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

};
