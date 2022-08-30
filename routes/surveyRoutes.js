const express = require("express");
const mongoose = require("mongoose");
const { Path } = require("path-parser");
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

  try {
    await mailer.send();
    await survey.save();
    res.send("ok");
  } catch (err) {
    res.status(422).send(err);
  }
});
router.post("/api/surveys/vote", async (req, res) => {});

router.post(
  "/api/surveys/webhooks",
  express.urlencoded({ extended: false }),
  (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const { recipient: email, url, event } = req.body;
    const match = p.test(new URL(url).pathname);

    if (match && event === "clicked") {
      //false &&
      Survey.updateOne(
        {
          _id: match.surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [match.choice]: 1 },
          $set: { "recipients.$.responded": true },
          // lastResponded: new Date(),
        }
      ).exec();
    }
    console.log("gggg");
    res.send({});
  }
);
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
