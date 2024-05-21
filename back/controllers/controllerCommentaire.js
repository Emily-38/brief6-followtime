
const { ObjectId } = require("bson");
const{ extractToken }=require("../utils/token.js")
const jwt= require("jsonwebtoken");
const client = require('../connexion/mongodb.js');
const { Commentaires } = require("../models/Commentaires.js");

require('dotenv').config()

const CreateCommentaire = async (req, response) => {

    const token = await extractToken(req) ;
    
      jwt.verify(
        token,
      process.env.SECRET_KEY,
      async (err, authData) => {
          if (err) {
  
            console.log(err)
            res.status(401).json({ err: 'Unauthorized' })
            return
        } else {
  
    if (
          !req.body.description
      ) {
          response.status(400).json({ error: 'creation echouer' })
        }
      try {
          let commentaire = new Commentaires(
              req.body.description,
              authData.id,
              req.params.id,
              new Date(),
          )

          let result = await client
          
              .db('followtime')
              .collection('Commentaire')
              .insertOne(commentaire)
           response.status(200).json(result)
                      } catch (e) {
                         console.log(e)
                        response.status(500).json(e)
                      }
                  }
               }
            ) 
      }
const ReadCommentaire= async(req, res)=>{
try{
    const publication_id = req.params.id
    console.log(publication_id)
    
    const token = await extractToken(req) ;
         jwt.verify(
           token,
         process.env.SECRET_KEY,
         async (err, authData) => {
             if (err) {
    
              console.log(err)
              res.status(401).json({ err: 'Unauthorized' })
              return
          } else {
  
          let commentaire = 
          await client
          .db('followtime')
          .collection('Commentaire')
          .find({publication_id :publication_id})
          
      
          let apiResponse = await commentaire.toArray()
          res.status(200).json(apiResponse)
      }
    })
   
} catch(err){
    console.log(err)
}
}

async function deleteCommentaire(req, res) {
    const token = await extractToken(req) ;

  jwt.verify(
    token,
  process.env.SECRET_KEY,
  async (err, authData) => {
      if (err) {

        console.log(err)
        res.status(401).json({ err: 'Unauthorized' })
        return
    } else {


      if (!req.params.id) {
        res.status(400).send("Id Obligatoire");
      }
    
      let id = new ObjectId(req.params.id);
    
      let commentaire = await client
        .db("followtime")
        .collection("Commentaire")
        .deleteOne({ _id: id });
    
      let response = await commentaire;
    
      if (response.deletedCount === 1) {
        res.status(200).json({ msg: "Suppression réussie" });
      } else {
        res.status(204).json({ msg: "Pas d'annonce pour cette article" });
      }
    }
  }
  )
}

async function updateCommentaire(req, res){
    const id = req.params.id;
    const token = await extractToken(req) ;

        jwt.verify(
          token,
           process.env.SECRET_KEY,
            async (err, authData) => {
            if (err) {

            console.log(err)
            res.status(401).json({ err: 'Unauthorized' })
            return
  } else {

    if(
      !req.body.description
    ){
      res.status(400).json({error: 'remplir les champs'})
    }

     try{
       await client 
      .db('followtime')
      .collection('Commentaire')
      .updateOne(
        {_id: id},
        {
          $set:{
            description:req.body.description, 
          },
        }
      )
      
        res.status(200).json({ msg: "Update successful" });
      
     }catch(e){
      console.log (e)
      res.status(500).json(e)
     }
    }
    }
    )
}


module.exports={CreateCommentaire, ReadCommentaire, deleteCommentaire,updateCommentaire}