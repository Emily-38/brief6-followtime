
const { ObjectId } = require("bson");
const{ extractToken }=require("../utils/token.js")
const jwt= require("jsonwebtoken");
const { Publications } = require("../models/Publications.js");
const client = require('../connexion/mongodb.js')

require('dotenv').config()

const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express()
const uploadDirectory = path.join(__dirname, '../public/uploads')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//insertion d'image dans la base de donnée avec multer
const insertPublicationPicture = async (req, res) => {
    let newFileName
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDirectory)
      },
      filename: function (req, file, cb) {
        newFileName = `${file.fieldname}-${Date.now()}.jpg`
        cb(null, newFileName)
      },
    })
  
    const maxSize = 3 * 1000 * 1000
  
    let upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/
        var mimetype = filetypes.test(file.mimetype)
  
        var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        )
  
        if (mimetype && extname) {
          return cb(null, true)
        }
  
        cb(
          'Error: File upload only supports the ' +
            'following filetypes - ' +
            filetypes
        )
      },
    }).single('image')
  
    upload(req, res, function (err) {
      if (err) {
        res.send(err)
      } else {
        res.send({ newFileName: newFileName })
      }
    })
  }

const CreatePublication = async (req, response) => {

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
          let publication = new Publications(
              
              req.body.description,
              req.body.image,
              authData.id,
              [],
              new Date(),
          )

          let result = await client
          
              .db('followtime')
              .collection('Publication')
              .insertOne(publication)
           response.status(200).json(result)
                      } catch (e) {
                         console.log(e)
                        response.status(500).json(e)
                      }
                  }
               }
            ) 
      }
//read publication par id du user courant 
 const AllPublication = async (request, response) => {
        const token = await extractToken(request) ;
         jwt.verify(
           token,
         process.env.SECRET_KEY,
         async (err, authData) => {
             if (err) {
    
              console.log(err)
              response.status(401).json({ err: 'Unauthorized' })
              return
          } else {
  
          let publication = 
          await client
          .db('followtime')
          .collection('Publication')
          .find({user_id : authData.id})
      
          let apiResponse = await publication.toArray()
          response.status(200).json({publication:apiResponse, authData:authData})
      }
    })
}
const AllPublicationById = async (req, response) => {
    const id= new ObjectId(req.params.id)
    const token = await extractToken(req) ;
     jwt.verify(
       token,
     process.env.SECRET_KEY,
     async (err, authData) => {
         if (err) {

          console.log(err)
          response.status(401).json({ err: 'Unauthorized' })
          return
      } else {

      let publication = 
      await client
      .db('followtime')
      .collection('Publication')
      .findOne({_id : id})
  
      
      response.status(200).json(publication)
  }
})
}

const GetPublicationByUserId= async (request,response)=>{
  const token = await extractToken(request) ;
  let id=request.params.id
  
  jwt.verify(
    token,
  process.env.SECRET_KEY,
  async (err, authData) => {
      if (err) {

       console.log(err)
       response.status(401).json({ err: 'Unauthorized' })
       return
   } else {

   let publication = 
   await client
   .db('followtime')
   .collection('Publication')
   .find({user_id : parseInt(id)})
    
   let apiResponse = await publication.toArray()
   response.status(200).json(apiResponse)
}
})
}

async function deletePublication(req, res) {
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
    
      let publication = await client
        .db("followtime")
        .collection("Publication")
        .deleteOne({ _id: id });
    
      let response = await publication;
    
      if (response.deletedCount === 1) {
        res.status(200).json({ msg: "Suppression réussie" });
      } else {
        res.status(204).json({ msg: "Pas d'annonce pour cette article" });
      }
    }
  }
  )
}

async function updatePublication(req, response){
    const id = new ObjectId(req.params.id);
    const token = await extractToken(req) ;

        jwt.verify(
          token,
           process.env.SECRET_KEY,
            async (err, authData) => {
            if (err) {

            console.log(err)
            response.status(401).json({ err: 'Unauthorized' })
            return
  } else {

    if(
      !req.body.description
    ){
      response.status(400).json({error: 'remplir les champs'})
    }

     try{
       await client 
      .db('followtime')
      .collection('Publication')
      .updateOne(
        {_id: id},
        {
          $set:{
            description:req.body.description, 
          },
        }
      )
      
        response.status(200).json({ msg: "Update successful" });
      
     }catch(e){
      console.log (e)
      response.status(500).json(e)
     }
    }
    }
    )
  }

 
      // add participant
  async function addLike(req, res){
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

    const id = new ObjectId(req.params.id) ;
 
    try{ 
      await client
      .db("followtime")
      .collection("Publication")
      .updateOne({_id: id},
        {
          $addToSet:{
            likes:authData.id
          }
}
);
res.status(200).json({ msg: "ajout reussie" });
      }catch(e){
        console.log (e)
        res.status(500).json(e)
       }
      }
    }
    )
    }

    async function dislike(req, res){
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
        try{
           await client
            .db("followtime")
            .collection("Publication")
            .updateOne({ _id: id },
            {
              $pull:{likes:authData.id}
            }
          );
            res.status(200).json({ msg: "Suppression like réussie" });
          } catch {
            res.status(204).json({ msg: "Pas d'annonce pour cette article" });
          }
        }
      }
      )
    }
    

      module.exports={insertPublicationPicture, CreatePublication, AllPublication,AllPublicationById, deletePublication, updatePublication,addLike,dislike, GetPublicationByUserId}