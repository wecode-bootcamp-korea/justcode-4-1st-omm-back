const express = require("express")
const router = express.Router()

// const userRoute = require('./userRoute')

router.get('/', (req, res) => res.status(200).json({ message: "Hello! You are connected." }))

// router.use('/user', userRoute)


module.exports = router
