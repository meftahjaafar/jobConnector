const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function(req, res, next) {
    // @get token from header
    const token = req.header('x-auth-header')
    
    // @check token exists
    if(!token){
       return res.status(401).json({msg: 'No Token, Access denied !'})
    }

    // @verify Token
    try {
        const decoded = await jwt.verify(token, config.get('SECRET_KEY'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid !'})
    }
}