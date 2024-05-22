const express = require("express");
const middlEmail = require("../utils/middlewares/user/middlemail");
const { ctrlCreateUser, insertAvatarPicture, login, Confidentialiter, userbyAuthData, allUsers, addfollowing, unfollowing, allFollow, allFollowByAuthData, followersAsFollow, userbyIdUser, ctrlSearchByPseudo, ctrlSearchByemail, updateCompteDesactive, updateCompteActive, updatePassword, mailerpassword, updateprofilephoto, updateprofilBanner, updatePseudo, updateConfidentialiter, updateEmail, mailerEmail, UserByIdPlusNomberFollower, AllUserNBFollow, forgetPassword } = require("../controllers/ControllerUser");
const middlalpha = require("../utils/middlewares/user/middlalpha");
const router = express.Router();


router.post("/photoProfile", insertAvatarPicture)
router.post("/register", middlEmail,middlalpha, ctrlCreateUser)
router.post("/login", middlEmail, login)
router.get("/confidentialiter", Confidentialiter)
router.get('/users', userbyAuthData)
router.get("/allUser",allUsers)
router.get('/userbyid/:id',userbyIdUser)
router.get('/searchUser/:name', ctrlSearchByPseudo)
router.get('/searchUserByEmail/:name',ctrlSearchByemail)

// route follow
router.post('/following/:id',addfollowing)
router.get('/UserNBFollow', AllUserNBFollow)
router.get('/allUserPlusFollowers/:id', UserByIdPlusNomberFollower)
router.delete('/unfollow/:id', unfollowing)
router.get('/allFollow',allFollow)
router.get('/followByAuth/:id',allFollowByAuthData)
router.get('/followersasFollow',followersAsFollow)

//les updates
router.patch('/desactiveCompte/:id', updateCompteDesactive)
router.patch('/activeCompte/:id', updateCompteActive)
router.patch('/updateAvatar', updateprofilephoto)
router.patch('/updateBanniere', updateprofilBanner)
router.patch('/updateConfidentialiter',updateConfidentialiter)
router.patch('/updatePseudo',updatePseudo)
router.patch('/updateEmail/:token',updateEmail)
router.patch('/use-change-email',mailerEmail)
router.patch('/updatePassword/:token', updatePassword)
router.patch('/user-change-password', mailerpassword)
router.patch('/forget_Password',forgetPassword)

module.exports=router
