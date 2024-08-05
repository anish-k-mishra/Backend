require('dotenv').config() 
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/linkedin', (req, res)=>{
    res.send('Aniah Mishra')
})

app.get('/login', (req, res) => {
    res.send('<h2>Please Login</h2>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
