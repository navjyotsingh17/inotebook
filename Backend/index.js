const connectToMongo = require('./db');
const express = require('express')
//defing the cors for maing the API request from frontend.
var cors = require('cors')

//calling the methos to connect to db
connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

//Available Routes and their locations
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})

