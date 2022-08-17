const express = require('express')
const cors = require('express')

const app = express()
app.use(express.json({ limit: '5MB', extended: true}));
app.use(express.urlencoded({ extended: true}))
app.use(cors())


app.get('/', (req, res) => {
  res.json({message: "Welcome!"})
})

// Routes goes here
app.use('/api', require('./routes'));

module.exports = app