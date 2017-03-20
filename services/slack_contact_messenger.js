var SlackBaseMessenger = require('./slack_base_messenger');

var SlackOrderMessenger = function () {
  this.channel_name = '#orders'

  this.new_order = function(stripe_object) {
    var message= 'New stripe transaction: ' + stripe_object.metadata.distro +
    '\ntransaction ID:'+stripe_object.id+",\namount:"+stripe_object.amount+",\ncontact:"+stripe_object.receipt_email;

    this.send_message(this.channel_name, message)
  }

  this.new_freebie = function(collector_email, download_id){
    var message= 'New freebie generated: ' + download_id +'\nfor user: '+collector_email;

    this.send_message(this.channel_name, message)
  }
}

SlackOrderMessenger.prototype = new SlackBaseMessenger();

module.exports = new SlackOrderMessenger();
