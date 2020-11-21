const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Company = require('../../models/Company')
const Job = require('../../models/Job')


module.exports = router