const express= require('express')
const app = express()
const cors = require('cors')
const { connect } = require('./connexion/mongodb')
const routerUser = require('./routes/routeUser')
const routerPublication = require('./routes/routePublication')
const routerCommentaire = require('./routes/routeCommentaire')


require('dotenv').config()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

connect(process.env.MONGO_URL, (error) => {
    if (error) {
        console.log('connexion échoué')
        process.exit(-1)
    } else {
        console.log('connexion reussi')
    }
})

const PORT = 3555;

app.use("/", routerUser);
app.use('/', routerPublication)
app.use('/', routerCommentaire)


app.listen(PORT, () => {
    console.log("im listening on port", PORT);
  });