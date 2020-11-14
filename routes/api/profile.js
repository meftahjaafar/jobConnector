const router = require('express').Router()

// @route GET api/profile
// @desc test route
// @access private

router.get('/', (req, res) => res.send('Hello profile !'))


module.exports = router