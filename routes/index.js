const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const CategoryRoute = require("./CategoryRoute");
const FormRoute = require("./FormRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/category", CategoryRoute);
router.use("/form", FormRoute);

module.exports = router;
