const router= require('express').Router()


// @route GET api/posts
// @desc test route
// @access private

router.get('/', (req, res) => res.send('Hello posts !'))


module.exports = router