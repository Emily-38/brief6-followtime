const express = require("express");
const middlEmail = require("../utils/middlewares/user/middlemail");
const { ctrlCreateUser, insertAvatarPicture, login, Confidentialiter, userbyAuthData, allUsers } = require("../controllers/ControllerUser");
const middlalpha = require("../utils/middlewares/user/middlalpha");
const router = express.Router();


router.post("/photoProfile", insertAvatarPicture)
router.post("/register", middlEmail,middlalpha, ctrlCreateUser)
router.post("/login", middlEmail, login)
router.get("/confidentialiter", Confidentialiter)
router.get('/users', userbyAuthData)
router.get("/allUser",allUsers)

module.exports=router
