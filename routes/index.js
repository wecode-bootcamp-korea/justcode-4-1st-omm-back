const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRouter");
const CategoryRoute = require("./CategoryRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/user", UserRoute);
router.use("/category", CategoryRoute);

module.exports = router;
