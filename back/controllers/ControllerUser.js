
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken');

const { pool } = require('../connexion/sql');
require('dotenv').config()



const express = require('express')
const path = require('path')
const multer = require('multer');
const { extractToken } = require('../utils/token');
const app = express()
const uploadDirectory = path.join(__dirname, '../public/uploads')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//insertion d'image dans la base de donnée avec multer
const insertAvatarPicture = async (req, res) => {
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

// creation d'un user avec hashage de mots de passe et creation d'un token verification d'un email deja
// existant dans la base de donnée et pseudo aussi
const ctrlCreateUser = async (req, res) => {
    try {
     const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
    const image= req.body.image
    const email= req.email
    const pseudo= req.pseudo
    const confidentialité= req.body.confidentialité

    const searchemail = [email];

    const sqlEmail = "SELECT email FROM users WHERE email =?";
    const [resultEmail] = await pool.execute(sqlEmail, searchemail);

    const searchpseudo = [pseudo];

    const sqlPseudo = "SELECT pseudo FROM users WHERE pseudo =?";
    const [resultPseudo] = await pool.execute(sqlPseudo, searchpseudo);

    if (resultEmail.length !==0 || resultPseudo.length !== 0) {
      res.status(400).json({ error: "Invalid credentials" });
    }else{

       let activationToken = await bcrypt.hash(email, 10)
       let cleanToken=activationToken.replace('/','')
      

if(!email||!pseudo||!image||!hashedPassword||!confidentialité){
    res.json({message: "les champs ne sont pas remplis"})
}else{
    let data =[email,pseudo,image,hashedPassword,confidentialité,cleanToken];
        const sql = `INSERT INTO users (email,pseudo,image,password,confidentialité_id,token)
                    VALUES (?,?,?,?,?,?)`;      
     const[rows]=await pool.execute(sql, data);

     const user_id= rows.insertId
     const values=[user_id,user_id ]
     const addFollow = `INSERT INTO followers (source_id,cible_id)
               VALUES (?,?)`;
      const[result]=await pool.execute(addFollow, values);

      res.json({user:rows, follow:result});
    }}
    } catch (err) {
      console.log(err.stack);
    }
  };

  //login avec compare password hash et creation de jwt renvoi le jwt et le role
  const login = async (req, res) => {
    if (!req.email || !req.body.password) {
        res.status(400).json({ error: 'il manque des champs' })
        return
    }
   
    const email=req.email
    const sql =`SELECT * FROM users WHERE email=?`
    const values = [email]
    const [rows] = await pool.execute(sql, values)

    
if(rows.length === 0){
    res.status(401).json({ error: 'utilisateur existe pas' })
    return
}

const isValidPassword = bcrypt.compareSync(req.body.password, rows[0].password)
if (!isValidPassword) {
    res.status(401).json({ error: 'le mot de passe est pas valide' })

    return
} else {
    const token = jwt.sign(
        {
            id: rows[0].id,
            email: rows[0].email,
            image:rows[0].image,
            pseudo:rows[0].pseudo,
            role: rows[0].role,
            confidentialité:rows[0].confidentialité
        },

            process.env.SECRET_KEY,
            { expiresIn: '20d'}
    )


 res.status(200).json({ jwt: token , user:rows[0].role})
    }

}

const Confidentialiter= async (req, res) =>{
try{
    const [rows, fields] = await pool.execute("SELECT * FROM confidentialité ")
    res.json(rows);
} catch (err) {
  console.log(err.stack);
}
}
const userbyAuthData= async (req, res) =>{
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
  
  try{
    const id = [authData.id];

    const sql = "SELECT * , CONCAT('/uploads/', image) as avatar, CONCAT('/uploads/', banniere) as banniere FROM users WHERE id=?";
    const [result] = await pool.execute(sql, id);
      res.json(result);
  } catch (err) {
    console.log(err.stack);
  }
}
      })
  }
const allUsers= async (req, res) =>{
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
    
    try{
      
  
      const sql = "SELECT * ,users.id as userid, CONCAT('/uploads/', image) as avatar, CONCAT('/uploads/', banniere) as banniere, COUNT(users.id) as follower FROM users JOIN followers ON users.id=followers.cible_id GROUP BY followers.cible_id";
      const [result] = await pool.execute(sql);
        res.json(result);
    } catch (err) {
      console.log(err.stack);
    }
  }
        })
  }

  const userbyIdUser= async (req, res) =>{
    const token = await extractToken(req) ;
    const id= req.params.id
        jwt.verify(
          token,
        process.env.SECRET_KEY,
        async (err, authData) => {
            if (err) {
    
              console.log(err)
              res.status(401).json({ err: 'Unauthorized' })
              return
          } else {
    
    try{
      const id_user = [id];
  
      const sql = "SELECT * , CONCAT('/uploads/', image) as avatar, CONCAT('/uploads/', banniere) as bannier FROM users WHERE id=?";
      const [result] = await pool.execute(sql, id_user);
        res.json(result);
    } catch (err) {
      console.log(err.stack);
    }
  }
        })
    }

  const addfollowing= async (req, res)=>{
    const userFollow=req.params.id
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
          try{
          const user_id= authData.id
          const data=[user_id,userFollow ]
          const sql = `INSERT INTO followers (source_id,cible_id)
                    VALUES (?,?)`;
          
     const[rows]=await pool.execute(sql, data);
      
      res.json(rows);
    }
     catch (err) {
      console.log(err.stack);
    }
  }
  })
}
const unfollowing= async (req, res)=>{
  const userFollow=req.params.id
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
        try{
        const user_id= authData.id
        const data=[user_id,userFollow ]
        const sql = `DELETE FROM followers WHERE source_id=? AND cible_id= ?`;
        
   const[rows]=await pool.execute(sql, data);
    
    res.json(rows);
  }
   catch (err) {
    console.log(err.stack);
  }
}
})
}

const allUserPlusNomberFollower= async (req, res)=>{
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

try{
const values=[req.params.id]

const sql = "SELECT COUNT(users.id) AS nbFollower, users.id AS Profile FROM users JOIN followers ON users.id=followers.cible_id WHERE users.id= ?";
const [result] = await pool.execute(sql, values);
  res.json(result);
} catch (err) {
console.log(err.stack);
}
}
  })


}
const allFollow= async (req, res) =>{
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
  
  try{
    

    const sql = "SELECT *  FROM followers ";
    const [result] = await pool.execute(sql);
      res.json(result);
  } catch (err) {
    console.log(err.stack);
  }
}
      })
}

const allFollowByAuthData= async (req, res) =>{
  const token = await extractToken(req) ;
  const id =req.params.id
    
      jwt.verify(
        token,
      process.env.SECRET_KEY,
      async (err, authData) => {
          if (err) {
  
            console.log(err)
            res.status(401).json({ err: 'Unauthorized' })
            return
        } else {
  
  try{
    
const values=[authData.id, id]
    const sql = "SELECT *  FROM followers WHERE source_id=? AND cible_id=? ";
    const [result] = await pool.execute(sql,values);
      res.json(result);
  } catch (err) {
    console.log(err.stack);
  }
}
      })
}
const followersAsFollow= async (req, res)=>{
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
  
  try{
    
const values=[authData.id]
    const sql = "SELECT * FROM followers WHERE source_id=? ";
    const [result] = await pool.execute(sql,values);
      res.json(result);
  } catch (err) {
    console.log(err.stack);
  }
}
      })
}

const ctrlSearchByPseudo= async(req, res)=>{
  let search=req.params.name
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
  try{
    const sql =`SELECT *, CONCAT('/uploads/', image) as avatar FROM users WHERE pseudo LIKE '%${search}%' `
    
    const [rows] = await pool.execute(sql)
    res.json(rows)
  }catch(err){
    console.log(err)
  }
}
})
}
const ctrlSearchByemail= async(req, res)=>{
  let search=req.params.name
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
  try{
    const sql =`SELECT *, CONCAT('/uploads/', image) as avatar FROM users WHERE email LIKE '%${search}%' `
    
    const [rows] = await pool.execute(sql)
    res.json(rows)
  }catch(err){
    console.log(err)
  }
}
})
}
const updateCompteDesactive=async (req,res)=>{
const userId=req.params.id
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
      try{
        const data=[userId]
        const sql =`UPDATE users SET isActive = '0' WHERE users.id = ?;  `
        
        const [rows] = await pool.execute(sql,data)
        res.json(rows)
      }catch(err){
        console.log(err)
      }
    }
    })
}
const updateCompteActive=async (req,res)=>{
  const userId=req.params.id
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
        try{
          const data=[userId]
          const sql =`UPDATE users SET isActive = '1' WHERE users.id = ?;  `
          
          const [rows] = await pool.execute(sql,data)
          res.json(rows)
        }catch(err){
          console.log(err)
        }
      }
      })
  }
const updatePassword = async (req,res)=>{
  const tokenmailer=req.params.token
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

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
        try{
          const data=[hashedPassword,tokenmailer]
          const sql =`UPDATE users SET password = ? WHERE token= ?;  `
          
          const [rows] = await pool.execute(sql,data)
          res.json(rows)
        }catch(err){
          console.log(err)
        }
      }
      })

  }
  module.exports={ctrlCreateUser, insertAvatarPicture, login, Confidentialiter,userbyAuthData,allUsers,addfollowing, allUserPlusNomberFollower, unfollowing,allFollow,allFollowByAuthData, followersAsFollow,userbyIdUser,ctrlSearchByPseudo,ctrlSearchByemail, updateCompteDesactive,updateCompteActive,updatePassword }


