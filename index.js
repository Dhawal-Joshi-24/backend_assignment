const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'))


app.listen(port, () => {
  console.log(`Ourscreen app listening at http://localhost:${port}`)
})