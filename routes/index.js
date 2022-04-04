const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const CategoryRoute = require("./CategoryRoute");
const FormRoute = require("./FormRoute");
const MasterRoute = require("./MasterRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/category", CategoryRoute);
router.use("/form", FormRoute);
router.use("/pro", MasterRoute);

module.exports = router;
