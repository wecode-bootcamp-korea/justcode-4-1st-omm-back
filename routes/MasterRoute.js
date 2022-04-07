const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");
const _vaildateToken = require("../middleware/_vaildateToken");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZXhwaXJlZF9pbiI6IjFociIsImlhdCI6MTY0OTMxNTc3NX0.4_83vFeT0hSMF2dehyC28Vj1hshGjlgGub2xGelEZoU

// GET
router.get("/profile", _vaildateToken, MasterController.getMasterProfile);

// PUT
router.put("/profile", MasterController.setMasterProfile);

// POST
router.post("/signup", MasterController.signUp);

module.exports = router;
