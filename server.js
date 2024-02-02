const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(timeNow);
app.get("/", (req, res) => {
  res.render("index", { text: "my test" });
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);
function timeNow(req, res, next) {
  console.log(new Date());
  next();
}
app.listen(port);
