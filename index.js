const express = require("express");
const mongoose = require("mongoose"); //t
const cookieSession = require("cookie-session");

const passport = require("passport");

const keys = require("./config/keys");
// require("./models/User"); //t
// require("./models/Survey"); //t
// require("./passport"); //t

const auth = require("./routes/authRoutes");
// const survey = require("./routes/surveyRoutes");//t

// mongoose.Promise = global.Promise; //t
// mongoose
//   .connect(keys.mongoURI, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log("ee", err, "eee")); //t

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", auth);
// .use("/", survey);
app.get("/", (req, res) => {
  res.send("Hello World9!");
});
app.get("/we", (req, res) => {
  res.send("Hello WorldWEEE!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// app.listen(PORT, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });
