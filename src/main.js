import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// import AV from 'leancloud-storage'
// var APP_ID = 'Eta9AT6VkmU64zloR2B2SGdp-gzGzoHsz'
// var APP_KEY = '61xiHiqwwAvGODyzBnJlxl54'
//
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY,
//   serverURL:'https://eta9at6v.lc-cn-n1-shared.com',
// })
// const TestObject = AV.Object.extend('TestObject')
// const testObject = new TestObject()
// testObject.save({ words: 'Hello World!' })
// console.log('LeanCloud Rocks!123123')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
