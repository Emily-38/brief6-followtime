const express = require("express");
const middlEmail = require("../utils/middlewares/middlemail");
const { ctrlCreateUser, insertArticlePicture, login, Confidentialiter } = require("../controllers/ControllerUser");
const middlalpha = require("../utils/middlewares/middlalpha");
const router = express.Router();


router.post("/photoProfile", insertArticlePicture)
router.post("/register", middlEmail,middlalpha, ctrlCreateUser)
router.post("/login", middlEmail, login)
router.get("/confidentialiter", Confidentialiter)

module.exports=router
