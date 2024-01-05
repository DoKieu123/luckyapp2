import getters from "./getters";
import actions from "./actions";
import { defineStore } from "pinia";
const useProductStore = defineStore("product", {
    state: () => {
        return {
            product: [
            ],
            productSearch: [],
            selectedProduct: [],
            hiddenSearch: false,
        };
    },
    getters,
    actions,

});


export default useProductStore;