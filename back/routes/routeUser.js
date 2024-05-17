const express = require("express");
const middlEmail = require("../utils/middlewares/user/middlemail");
const { ctrlCreateUser, insertAvatarPicture, login, Confidentialiter, userbyAuthData, allUsers, addfollowing, allUserPlusNomberFollower, unfollowing, allFollow, allFollowByAuthData } = require("../controllers/ControllerUser");
const middlalpha = require("../utils/middlewares/user/middlalpha");
const router = express.Router();


router.post("/photoProfile", insertAvatarPicture)
router.post("/register", middlEmail,middlalpha, ctrlCreateUser)
router.post("/login", middlEmail, login)
router.get("/confidentialiter", Confidentialiter)
router.get('/users', userbyAuthData)
router.get("/allUser",allUsers)
router.post('/following/:id',addfollowing)
router.get('/allUserPlusFollowers/:id', allUserPlusNomberFollower)
router.delete('/unfollow/:id', unfollowing)
router.get('/allFollow',allFollow)
router.get('/followByAuth/:id',allFollowByAuthData)

module.exports=router
