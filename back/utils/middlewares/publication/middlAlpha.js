
const validator=require('validator')

//middlewares verification de lettre
const middlAlpha = (req, res, next) => {
const description = req.body.description;
if (!validator.isAlphanumeric(description)) {
  return res.status(400).json({ msg: "mettre des lettres" });
}
req.description = description;

next();
};

module.exports= middlAlpha