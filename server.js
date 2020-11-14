const express = require('express')
const app = express()


const connectDB = require('./config/db')

// @runnig server
const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Server runnig @ http://localhost:${PORT}`)
} )

app.get('/', (req, res) => {
    res.send('Hello Developers !')
})

// @connect Database
connectDB()

//@ routes

app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))