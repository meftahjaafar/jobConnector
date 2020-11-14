const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')


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
  ], (req, res) => {

    const errors= validationResult(req)
    if (!errors.isEmpty()){
        return  res.status(400).json({ errors: errors.array()})
    }
    res.send('Hello !')
})

module.exports = router