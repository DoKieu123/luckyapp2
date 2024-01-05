<template>
 <baseDailog v-show="bock" @close="listShow">
    <div @click.stop>
      <div id="bill" v-for="bill in allBill" :key="bill.index" >
        <div class="title-header date-code" >
          <div><span>Số:</span> <span>{{ bill.id }}</span></div>
          <div><span>Ngày:</span> <span>{{ bill.formattedDate }}</span></div>
        </div>
        <h2>HÓA ĐƠN BÁN HÀNG</h2>
        <div class="conten-bill">
          <ul class="bill-clien" >
            <li v-for="clien in bill.client" :key="clien.index">
              <div class="li-client">
                <span>Khách hàng:</span>
                <span class="titil-client">{{ clien.name }}</span>
              </div>
              <div class="li-client">
                <span>Số điện thoại :</span>
                <span class="titil-client">{{ clien.number }}</span>
              </div>
            </li>
          </ul>
          <ul class="product-bill title-product">
            <li>SL</li>
            <li>Đơn Giá</li>
            <li>Thành Tiền</li>
          </ul>
          <ul class="list-product" >
           <li class="product-bill" v-for="product in bill.listProduct" :key="product.id" >
                <div>
                  <span class="name-product">{{ product.name }}</span>
                  <span>{{ product.selected }}</span>
                </div>
                <div>{{ product.price }}</div>
                <div>{{ product.totalamount }}</div>
           </li>
          </ul>
          <ul class="total-bill">
            <li>
              <span>Cộng tiền hàng</span>
              <span>{{ bill.totalAmount }}</span>
            </li>
            <li>
              <span>Chiết khấu </span>
                <span>{{ bill.discount }} %</span>
            </li>
            <li class="bold">
              <span>Khách phải trả</span>
              <span>{{ bill.amountToPay }}</span>
            </li>
            <li>
              <span>Tiền khách đưa</span>
              <span>{{ bill.moneyGiven }}</span>
            </li>
            <li>
              <span>Trả lại</span>
              <span>{{ bill.exchange }}</span>
            </li>
            <li>
              <span>Phương thức thanh toán</span>
              <span>{{ bill.method }}</span>
            </li>
          </ul>
          <h3>Cảm ơn quý khách.Hẹn gặp lại!</h3>
        </div>
      </div>
    </div>
 </baseDailog>
</template>
<script>
import useOrderStore from "@/store/order"
import baseDailog from "@/components/UI/baseDailog.vue";
export default {
    props:[],
    data() {
        return {
            blocks: true
        }
    },
    components:{
      baseDailog
    },
    computed:{
    bock(){
      return useOrderStore().blockBill
    },
    allBill(){
        return useOrderStore().bill
    }
    },
    methods:{
      abc(){
        console.log(this.allBill);
      },
      listShow(){
        useOrderStore().hidden()
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
ul {
  list-style: none;
}
#bill {
  position: fixed;
  margin: 0 auto;
  top: 0px;
  left: 22%;
  width: 56%;
  background-color: white;
  box-shadow: 5px 8px 10px 3px #9a9999;
  padding: 30px 60px;
  .date-code{
    display: flex;
    justify-content: space-between;
    padding-bottom: 25px;
    border-bottom: 1px dashed palevioletred;
  }
  h2{
    margin-bottom: 15px;
    padding-top: 15px;
  }
  .conten-bill{
    .bill-clien{
        border-bottom: 1px dashed palevioletred;
        padding-bottom: 10px;
        .li-client{
            display: flex;
            margin-bottom: 10px;
            .titil-client{
                margin-left: 10px;
                font-weight: 600;
            }
        }
    }
    .product-bill{
        display: flex;
        justify-content: space-between;
        align-items: end;
        div{
            span{
                display: block;
            }
        }
        .name-product{
            color: rgb(216, 91, 112);
        }
        .list-product{
            li{
                padding: 8px;
            }
        }
    }
    .title-product{
        font-weight: 600;
        border-bottom: 1px double palevioletred;
        padding: 6px 0px;
    }
    .total-bill{
        .bold{
            font-weight: 600;
        }
        border-top:  1px solid palevioletred;
        padding: 15px 0px;
        li{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
    }
  }
}
</style>
