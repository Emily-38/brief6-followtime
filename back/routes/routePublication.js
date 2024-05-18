const express = require("express");
const { CreatePublication, AllPublication, deletePublication, updatePublication, insertPublicationPicture, AllPublicationById, addLike, dislike, GetPublicationByUserId } = require("../controllers/ControllerPublication");


const router = express.Router();

router.post('/insertImage',insertPublicationPicture)
router.post('/CreatePublication', CreatePublication)
router.delete('/publicationDelete/:id', deletePublication)
router.get('/publications', AllPublication)
router.get('/getpublicatonbyid/:id',GetPublicationByUserId)
router.patch('/publicationUpdate/:id', updatePublication)
router.get('/publicationById/:id', AllPublicationById)
router.put('/like/:id', addLike)
router.patch('/dislike/:id', dislike)


module.exports=router