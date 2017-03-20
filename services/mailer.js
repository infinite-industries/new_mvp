var dotenv = require('dotenv');
dotenv.load();   //get cofiguration file from .env

var mailgun = require('mailgun.js');
var mg = mailgun.client({username: 'api', key: process.env.LIVE_MAILGUN_API_KEY});
var mail_domain = process.env.LIVE_MAILGUN_DOMAIN;

var fs = require('fs');

// not used for now but will be later
// var email_templates = {
//
//
//   admin_update:{
//     from: 'INFINITE.INDUSTRIES <info@infinite.industries>',
//     to: ['shifting.planes@gmail.com'],
//     subject: 'update',
//     text: 'Update here'
//   }
// }

var template = {
  DOWNLOAD_ID_EMAIL:"aaaarge!"
}

function LoadHTMLTemplate(path_to_template, callback){
  fs.readFile(path_to_template, 'utf8', function (error, data) {
    if(!error){
      callback(data);
    }
  });

}


module.exports = {

  sendEmail: function(requested_action){
    var mail_content = {};
    mail_content.from = 'INFINITE.INDUSTRIES <info@infinite.industries>';
    mail_content.to = [requested_action.email];
    mail_content.subject = process.env.MODE +': '+requested_action.subject;
    mail_content.text = requested_action.text;
    mail_content.html = requested_action.html;

    // console.log(mail_content);
    mg.messages.create(mail_domain, mail_content)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));

  },
  sendAdminEmail:function(requested_action){

    //var mail_content = email_templates[which_email];
    var mail_content = {};
    mail_content.from = 'INFINITE.INDUSTRIES <info@infinite.industries>';
    mail_content.to = [process.env.ADMIN_EMAIL];
    mail_content.subject = process.env.MODE +': '+requested_action.subject;
    mail_content.text = requested_action.text;

    // console.log(mail_content);
    mg.messages.create(mail_domain,mail_content)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  },

  sendDownloadEmail: function(collector_email, user_uuid, download_name){
    //var download_link = "http://"+process.env.DOMAIN+"/downloads/file/"+user_uuid;
    var download_link = "http://"+process.env.DOMAIN+"/download-view/"+user_uuid;
    var self = this;

    LoadHTMLTemplate(__dirname+"/mail_templates/send_download_id.html",function(data){

      var download_mailer = {
        'subject':'File Download Link for Order ' + download_name,
        'html': data.replace("|*DOWNLOAD_LINK*|", download_link),
        'text':"Thank you for your order and your support! Follow "+download_link+" in order to download your file",
        'email': collector_email
      };

      self.sendEmail(download_mailer);

    });
  }

}
