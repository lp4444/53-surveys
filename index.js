const express = require("express");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");

// const passport = require("passport");

// const keys = require("./config/keys");
// require("./models/User");
// require("./models/Survey");
// require("./passport");

// const auth = require("./routes/authRoutes");
// const survey = require("./routes/surveyRoutes");

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(keys.mongoURI, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log("ee", err, "eee"));

const app = express();
// app.use(express.json());
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", auth).use("/", survey);
app.get("/", (req, res) => {
  res.send("Hello World6!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
