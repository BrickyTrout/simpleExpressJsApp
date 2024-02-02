const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getUsersFromDb();
  res.render("users/list", { users });
});
router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "enter your name" });
});
router.post("/", async (req, res) => {
  const name = req.body.firstName;
  const isValid = name.length > 0;
  // if (isValid) {
  const users = await getUsersFromDb();
  console.log("users", users);
  users.push({ name });
  const json = JSON.stringify(users);
  await fs.writeFile("users.json", json, "utf8");
  res.redirect(`/users/${users.length - 1}`);
  // } else {
  //   console.log("error submitting new user");
  //   res.render("users/new", { firstName: name });
  // }
});

// middleware to retrieve user info given user id
router.param("id", async (req, res, next, id) => {
  console.log(id);
  const users = await getUsersFromDb();
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

async function getUsersFromDb() {
  const data = await fs.readFile("users.json", "utf8");
  console.log(data);
  const parsed = JSON.parse(data);
  console.log("parsed", parsed);
  return parsed;
}

module.exports = router;
