const express = require("express");
const { CreateCommentaire, ReadCommentaire, deleteCommentaire, updateCommentaire } = require("../controllers/controllerCommentaire");
const router = express.Router();

router.post('/createCommentaire/:id',CreateCommentaire)
router.get('/Commentaire/:id',ReadCommentaire)
router.delete('/commentairedelete/:id',deleteCommentaire)
router.patch('/commentaireUpdate/:id',updateCommentaire)
module.exports= router