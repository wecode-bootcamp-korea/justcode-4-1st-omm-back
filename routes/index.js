const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const CategoryRoute = require("./CategoryRoute");
const FormRoute = require("./FormRoute");
const MasterRoute = require("./MasterRoute");
const AddressRoute = require("./AddressRoute");
const ReviewRoute = require("./ReviewRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/category", CategoryRoute);
router.use("/form", FormRoute);
router.use("/master", MasterRoute);
router.use("/address", AddressRoute);
router.use("/review", ReviewRoute);

module.exports = router;