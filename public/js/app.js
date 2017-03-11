// register modal component
Vue.component('modal-contact', {
  template: '#modal-template'
})

Vue.component('modal-download', {
  template: '#modal-template'
})


//loose JQuery in the next iteration and figure out how namespace
//several different scopes - one for each Vue instance in one app

// Download Page Scope
new Vue({
  el: '#app',
  data: {
    showContactModal: false,
    showDownloadModal: false,
    donationAmount:null,
    download:{
      email:" ",
      agreedToTerms: false,
      okToPutOnEmailList: false,
    },
    directContact: {
      name:" ",
      email:" ",
      phone:null,
      notes:"..."
    }
  },
  methods:{
    //collector donated money -- worked through stripe
    processDonation: function(){
      console.log(this.donationAmount);

      if(this.donationAmount>0){
        console.log(this.donationAmount);
      }
      else{
        this.donationAmount="0.00";
      }

    },
    //collector contacted I.I for work availability
    collectDirectContactInfo: function(){
      console.log(this.directContact.name);

    },
    //collector provided her email and initiated download process
    initiateDownloadProcess: function(){
      console.log(this.download.email);
    }
  }
})
