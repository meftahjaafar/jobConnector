const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

// @route GET api/auth
// @desc test route
// @access private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error !')
    }
})

// @route POST api/auth
// @desc authenticate user & get token
// @access Public

router.post('/', [
    // check valid email
    check('email', 'Please include a valid email !').isEmail(),
    // check password length
    check('password', 'Password is required !').exists()
  ], async (req, res) => {

    const errors= validationResult(req)
    if (!errors.isEmpty()){
        return  res.status(400).json({ errors: errors.array()})
    }
    const { email, password} = req.body

    try {
        // @check if user not exists !
        let user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ errors:[ {msg: 'Invalid Credentials !'} ] })
        }
        

        // @verify password

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors:[ {msg: 'Invalid Credentials !'} ] })
        }
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