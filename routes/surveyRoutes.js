const express = require("express");
const mongoose = require("mongoose");
const { Path } = require("path-parser");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../mail/Mailer");
const Survey = mongoose.model("surveys");
const User = mongoose.model("users");
const mailTemplate = require("../mail/mailTemplate");

router.get("/api/surveys", async (req, res) => {
  const filter = req.query.userId ? { _user: req.query.userId } : {};
  const surveys = await Survey.find(filter);

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

  const mailer = new Mailer(survey, mailTemplate(survey, req.user.email));
  try {
    if (recipients) await mailer.send();
    await survey.save();
    res.send("ok");
  } catch (err) {
    res.status(422).send(err);
  }
});
router.post("/api/surveys/vote", async (req, res) => {
  const { email, _id } = req.body;
  Survey.updateOne(
    {
      _id,
      "recipients.email": { $ne: email },
    },
    {
      $push: { recipients: { email: email, responded: false } },
    }
  ).exec();

  Survey.findById(_id, async function (err, docs) {
    if (err) {
      res.status(422).send(err);
    } else {
      console.log("Result : ", docs);
      const surveyUser = await User.findById(docs._user);

      const mailer = new Mailer(
        docs,
        mailTemplate(docs, surveyUser?.email),
        email
      );
      if (email) await mailer.send();
      res.send("ok");
    }
  });
});

router.post(
  "/api/surveys/webhooks",
  express.urlencoded({ extended: false }),
  (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const { recipient: email, url, event } = req.body["event-data"];
    const match = p.test(new URL(url).pathname);

    if (match && event === "clicked") {
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
    res.send(req.body);
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
