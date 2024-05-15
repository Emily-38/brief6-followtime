const express = require("express");
const { CreatePublication, AllPublication, deletePublication, updatePublication, insertPublicationPicture, AllPublicationById } = require("../controllers/ControllerPublication");


const router = express.Router();

router.post('/insertImage',insertPublicationPicture)
router.post('/CreatePublication', CreatePublication)
router.delete('/publicationDelete/:id', deletePublication)
router.get('/publications', AllPublication)
router.patch('/publicationUpdate/:id', updatePublication)
router.get('/publicationById/:id', AllPublicationById)


module.exports=router