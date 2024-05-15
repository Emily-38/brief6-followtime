const validator=require('validator')

//middlewares verification d'email
const middlEmail = (req, res, next) => {
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "mettre un email" });
    }
    req.email = email;
    next();
  };

  module.exports= middlEmail