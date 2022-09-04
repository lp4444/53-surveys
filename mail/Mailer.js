const keys = require("../config/keys");

const domain = keys.mailgunDomain;
const mailgun = require("mailgun-js")({
  apiKey: keys.mailgunKey,
  domain: domain,
});

class Mailer {
  constructor({ subject, recipients }, content, oneMail) {
    this.data = {
      from: "NO-REPLY <no-reply@survey-easy53.com>",
      to: this.formatAddresses(recipients, oneMail),
      subject: subject,
      html: content,
    };
  }

  formatAddresses(recipients, oneMail) {
    return oneMail || recipients.map(({ email }) => email).join(",");
  }

  async send() {
    const resp = await mailgun.messages().send(this.data);
    return resp;
  }
}

module.exports = Mailer;
