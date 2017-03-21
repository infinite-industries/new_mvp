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
var app = new Vue({
  el: '#app',
  data: {
    showContactModal: false,
    showDownloadModal: false,
    donationAmount:null,
    download:{
      email:"",
      agreedToTerms: false,
      okToPutOnEmailList: true,
    },
    directContact: {
      name:"",
      email:"",
      phone:null,
      notes:"..."
    },
    stripe_instance: {},
    stripe_token: {}
  },
  mounted: function(){

    if((window.location.hostname=="infinite.industries")||(window.location.hostname=="www.infinite.industries")){
      var stripe_pub_key = 'pk_live_NUkz1WdJ0HFmSwEyKetWuf8p';
    }
    else{
      var stripe_pub_key = 'pk_test_AnN5EyTAXijWCz9NbgpDpGX4';
    }

    this.stripe_instance = StripeCheckout.configure({
      name: 'INFINITE INDUSTRIES',
      key: stripe_pub_key,
      image: '/images/site-logo.png',
      locale: 'auto',
      token: function(token) {
        console.log('got a token. sending data to localhost');

        app.stripe_token= token;
        app.sendData2Server();
      }
    });
  },

  methods:{
    //collector donated money -- worked through stripe
    processDonation: function(){
      //console.log(this.donationAmount);

      if(this.donationAmount>0){
        console.log(this.donationAmount);
        this.stripe_instance.open({
          description: 'Thank you for your donation!',
          amount: this.donationAmount*100
        })
      }
      else{
        this.donationAmount="0.00";
      }

    },

    sendData2Server: function(){
      console.log(this.stripe_token +" amount:"+ this.donationAmount);

      axios.post('/process-payment', {
        token_id: this.stripe_token.id,
        price: this.donationAmount*100,
        email: this.stripe_token.email
      })
      .then(function(response) {
        //console.log(response.status);
        window.location.assign("/process-payment/success");
      })
      .catch(function (error) {
        //console.log(error);
        window.location.assign("/process-payment/failure");
      });

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
        //console.log(response.status);
        window.location.assign("/success-contact");
      })
      .catch(function (error) {
        //console.log(error);
        window.location.assign("/error-general");
      });
      this.showContactModal=false;
    },
    //collector provided her email and initiated download process
    initiateDownloadProcess: function(){
      //console.log(this.download.email);
      console.log(this.errors.has('download_email'));
      if(!this.errors.has('download_email'))
      {
        this.showDownloadModal=false;

        axios.post('/initiate-download-process', {
          download_email: this.download.email,
          // download_collectorAgreedToTerms: this.download.agreedToTerms,
          download_okToPutOnEmailList:this.download.okToPutOnEmailList
        })
        .then(function(response) {
          if(response.data.status==='success'){
            window.location.assign("/success-download");
          }
          else{
            window.location.assign("/error-general");
          }

        })
        .catch(function (error) {
          //console.log(error);
          window.location.assign("/error-general");
        });
      }
    }
  }
})
