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

// @Initialize middleware

app.use(express.json({ extended : false }))

/*---------------------------------------------*/ 
/*------------------routes---------------------*/
/*---------------------------------------------*/ 

//@ users
app.use('/api/users', require('./routes/api/users'))
//@ profiles
app.use('/api/profile', require('./routes/api/profile'))
//@ posts
app.use('/api/posts', require('./routes/api/posts'))
//@ authentication
app.use('/api/auth', require('./routes/api/auth'))
//@ companies
app.use('/api/company', require('./routes/api/company'))
//@ job posts
app.use('/api/jobs', require('./routes/api/jobs'))
//@ followers list
app.use('/api/followers', require('./routes/api/follower'))
//@ account's activity history 
app.use('/api/activities', require('./routes/api/activity'))
//@ posts shared
app.use('/api/sharedposts', require('./routes/api/sharedPost'))