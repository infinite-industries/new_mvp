var SlackBaseMessenger = require('./slack_base_messenger');

var SlackMessenger = function () {
  this.channel_name = '#orders'

  this.newOrder = function(stripe_object) {
    var message= 'New stripe transaction: ' + stripe_object.metadata.distro +
    '\ntransaction ID:'+stripe_object.id+",\namount:"+stripe_object.amount+",\ncontact:"+stripe_object.receipt_email;

    this.send_message('#orders', message)
  }

  this.newDownload = function(collector_email, download_id, add_to_email_list){
    var message= 'New download generated: ' + download_id +'\nfor user: '+collector_email+'\nadd to email list: '+add_to_email_list;

    this.send_message('#orders', message)
  }

  this.newContact = function(contact_data){
    var message= 'Contact from collector: ' + contact_data.collector_name +'\nfrom email: '+contact_data.collector_email+"\nphone: "+contact_data.collector_phone+"\nNOTES: "+ contact_data.collector_notes;

    this.send_message('#contact', message)
  }

}


SlackMessenger.prototype = new SlackBaseMessenger();

module.exports = new SlackMessenger();
