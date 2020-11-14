const router = require('express').Router()

// @route GET api/auth
// @desc test route
// @access private

router.get('/', (req, res) => res.send('Hello auth !'))

module.exports = router