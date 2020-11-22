const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

module.exports = router