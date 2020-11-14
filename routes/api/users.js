const router = require('express').Router()

// @route GET api/users
// @desc test route
// @access private

router.get('/', (req, res) => res.send('Hello user !'))

module.exports = router