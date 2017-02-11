// register modal component
Vue.component('modal-contact', {
  template: '#modal-template'
})

Vue.component('modal-download', {
  template: '#modal-template'
})

// start app
new Vue({
  el: '#app',
  data: {
    showContactModal: false,
    showDownloadModal: false

  }
})
