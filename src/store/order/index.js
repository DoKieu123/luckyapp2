import getters from "./getters";
import actions from "./actions";
import { defineStore } from "pinia";
const useOrderStore = defineStore("orders", {
    state: () => {
        return {
            orders:[],
            billOrder:[],
            hiddenBill: false
        };
    },
    getters,
    actions,

});

export default useOrderStore;