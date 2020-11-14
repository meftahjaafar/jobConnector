const express = require('express')
const app = express()

const connectDB = require('./config/db')

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Server runnig @ http://localhost:${PORT}`)
} )

app.get('/', (req, res) => {
    res.send('Hello Developers !')
})

connectDB()