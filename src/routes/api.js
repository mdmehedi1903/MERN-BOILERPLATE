const express = require('express');
const SendEmailUtility = require("../controller/testController");
const router = express.Router();

router.get("/home", SendEmailUtility.SendEmail);


module.exports = router;  