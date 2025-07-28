const express = require('express')
const { testController } = require('../controllers/testController')


//router object-store krega sirf routing ki functionality
const router = express.Router()

//routes
router.get('/',testController)

//export
module.exports = router