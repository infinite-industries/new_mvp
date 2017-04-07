var needle = require('needle');
var dotenv = require('dotenv');

dotenv.load();   //get configuration file from .env

var SlackBaseMessenger = function () {
  this.base_url = 'https://hooks.slack.com/'
  this.default_username = 'Catalog'
  this.default_icon_emoji = ':heavy_dollar_sign:'

  this.send_to_slack = function(channel_name, message, username, icon_emoji) {
    var username = (username === undefined) ? this.default_username : username;
    var icon_emoji = (icon_emoji === undefined) ? this.default_icon_emoji : icon_emoji;

    var data = {
      text:       message,
      channel:    channel_name,
      username:   username,
      icon_emoji: icon_emoji
    }
    var options = {
      headers: { 'Content-Type': 'application/json' }
    }

    needle.post(this.base_url + process.env.SLACK_CREDENTIALS, JSON.stringify(data), options, function(err, resp) {
      if (!err && resp.statusCode == 200) {
        console.log(resp.body);
      }
    })
  }

  this.send_message = function(channel, message, username, icon_emoji) {
    if (process.env.SLACK_ENVIRONMENT != 'production') {
      message = process.env.DOMAIN + ' -> [' + channel + '] ' + message

      channel = '#test'
    }

    this.send_to_slack(channel, message, username, icon_emoji)
  }

  return this;
}

module.exports = SlackBaseMessenger;
