const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')


// @route GET api/users
// @desc test route
// @access Public

router.get('/', (req, res) => res.send('Hello user !'))

// @route POST api/users
// @desc register user
// @access Public

router.post('/', [
    // check empty name
    check('name', 'Name is required !').not().isEmpty(),
    // check valid email
    check('email', 'Please include a valid email !').isEmail(),
    // check password length
    check('password', 'Please enter a password with 6 or more charachters !').isLength({ min: 6 })
  ], async (req, res) => {

    const errors= validationResult(req)
    if (!errors.isEmpty()){
        return  res.status(400).json({ errors: errors.array()})
    }
    const {name, email, password} = req.body

    try {
        // @check if user exists !
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ errors:[ {msg: 'User already exists !'} ] })
        }
        
        // @create an avatar for user
        const avatar = gravatar.url(email, ({
            s:'200',
            r:'pg',
            d:'mm'}))
        // @create an user instance  
        user= new User({
            name,
            email,
            password,
            avatar
        })

        // @encrypt password with bcryptjs
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // @save user
        await user.save()

        // @return jsonwebtoken

        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, 
            config.get('SECRET_KEY'), 
            {expiresIn: 360000}, (err, token)  =>{
                if (err) throw err
                res.json({ token })
            } )
 
    
    } catch (error) {
        console.error(error.message)
        res.staus(500).send('Server Error @register route')
    }
})

module.exports = router