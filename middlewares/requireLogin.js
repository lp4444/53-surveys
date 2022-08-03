module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // res.redirect("/surveys");
    return res.status(401).send({ error: "You must log in!" });
  }
  return next();
};
