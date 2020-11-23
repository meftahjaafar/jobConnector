const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Activity = require('../../models/Activity')


// @route GET api/activities/
// @desc Get all activities (Account History)
// @access private
router.get('/', auth, async (req, res) =>{
    try {
        const activity = await Activity.findOne({user: req.user.id})
        if(!activity){
            return res.status(404).json({msg:'You dont have any account history !'})
        }
        res.send(activity)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:'Server Error !'})
    }
})
module.exports = router