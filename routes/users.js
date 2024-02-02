const express = require("express");

const router = express.Router();
const users = [{ name: "arthur" }, { name: "aimee" }, { name: "dani" }];

router.get("/", (req, res) => {
  console.log(req.query.name);
  res.render("users/list", { users });
});
router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "enter your name" });
});
router.post("/", (req, res) => {
  const isValid = false;
  if (isValid) {
    users.push({ name: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error submitting new user");
    res.render("users/new", { firstName: req.body.firstName });
  }
});

// middleware to retrieve user info given user id
router.param("id", (req, res, next, id) => {
  console.log(id);
  req.user = users[id];
  next();
});
router
  .route("/:id")
  // GET - display user info from middleware
  .get((req, res) => {
    const id = req.params.id;
    const { name } = req.user;
    console.log(req.user);
    res.send(`Get user with  ID ${id} is ${name}`);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`Put user with  ID ${id}`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`Delete user with  ID ${id}`);
  });

module.exports = router;
