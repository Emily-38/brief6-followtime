const validator=require('validator')

//middlewares verification de lettre
const middlalpha = (req, res, next) => {

    const pseudo = req.body.pseudo;
    if (!validator.isAlphanumeric(pseudo)) {
      return res.status(400).json({ msg: "mettre des lettres" });
    }
    req.pseudo = pseudo;
    next();
  };

  module.exports= middlalpha