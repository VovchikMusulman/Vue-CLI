import { createStore } from 'vuex'
import { loginRequest} from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
