export default {
    namespaced:true,
    state:{
    },
    getters:{},
    mutations:{},
    actions:{}
}

let defaultCity = '北京'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}
