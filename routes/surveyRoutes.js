const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Survey = mongoose.model("surveys");
router.get("/api/surveys", function (req, res) {
  res.send("got surveys", res);
});

router.post("/api/surveys", requireLogin, async (req, res) => {
  const { subject, body, recipients } = req.body;

  const survey = new Survey({
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // Great place to send an email!
  // const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    // await mailer.send();
    await survey.save();
    res.send("ok");
  } catch (err) {
    res.status(422).send(err);
  }
});
module.exports = router;
