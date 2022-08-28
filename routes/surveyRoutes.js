const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../mail/Mailer");
const Survey = mongoose.model("surveys");

const mailTemplate = require("../mail/mailTemplate");

router.get("/api/surveys", async (req, res) => {
  const filter = req.query.userId ? { _user: req.query.userId } : {};
  const surveys = await Survey.find(filter);
  // .select({
  //   recipients: false,
  // });

  res.send(surveys);
});

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting!");
});

router.post("/api/surveys", requireLogin, async (req, res) => {
  const { subject, body, recipients } = req.body;

  const survey = new Survey({
    subject,
    body,
    recipients: recipients
      ?.split(",")
      .map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // Great place to send an email!
  const mailer = new Mailer(survey, mailTemplate(survey));
  // console.log(mailer, "mailerrrrrrrrr");

  try {
    await mailer.send();
    await survey.save();
    res.send("ok");
  } catch (err) {
    res.status(422).send(err);
  }
});
router.delete("/api/surveys/:id", requireLogin, async (req, res) => {
  Survey.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(422).send(err);
    } else {
      res.send("ok");
    }
  });
});
module.exports = router;
