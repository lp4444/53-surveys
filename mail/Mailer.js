const keys = require("../config/keys");

const domain = keys.mailgunDomain;
const mailgun = require("mailgun-js")({
  apiKey: keys.mailgunKey,
  domain: domain,
});

class Mailer {
  constructor({ subject, recipients }, content) {
    this.data = {
      from: "NO-REPLY <no-reply@myaddress.com>",
      to: this.formatAddresses(recipients),
      subject: subject,
      html: content,
    };
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email).join(",");
  }

  async send() {
    const resp = await mailgun.messages().send(this.data);
    return resp;
  }
}

module.exports = Mailer;
