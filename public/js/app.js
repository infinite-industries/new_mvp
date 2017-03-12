// register modal component
Vue.component('modal-contact', {
  template: '#modal-template'
})

Vue.component('modal-download', {
  template: '#modal-template'
})

Vue.use(VeeValidate);


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
      okToPutOnEmailList: true,
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
      // console.log(this.directContact.name);
      // console.log(this.errors);
      axios.post('/direct-contact', {
        collector_name: this.directContact.name,
        collector_email: this.directContact.email,
        collector_phone: this.directContact.phone,
        collector_notes: this.directContact.notes

      })
      .then(function(response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.showContactModal=false;
    },
    //collector provided her email and initiated download process
    initiateDownloadProcess: function(){
      //console.log(this.download.email);
      axios.post('/direct-contact', {
        download_email: this.download.email,
        download_collectorAgreedToTerms: this.download.agreedToTerms,
        download_okToPutOnEmailList:this.download.okToPutOnEmailList
      })
      .then(function(response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.showDownloadModal=false;

    }
  }
})
