import getters from "./getters";
import actions from "./actions";
import { defineStore } from "pinia";
const useClientStore = defineStore("client", {
    state: () => {
        return {
            client: [],
            clientdatas:[],
            clientadd: false,
            hiddenClient: false
        };
    },
    getters,
    actions,

});

export default useClientStore;