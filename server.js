const express = require('express');
const app = express();
const path = require('path');


const connectDB = require('./config/db')


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



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(favicon(__dirname + '/client/build/favicon.ico'));
    app.use(express.static(__dirname));
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  // @runnig server
const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Server runnig @ http://localhost:${PORT}`)
} )

