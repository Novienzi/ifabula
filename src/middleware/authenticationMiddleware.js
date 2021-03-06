const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const passport = require('passport')
const bearerStrategy = require('passport-http-bearer').Strategy

passport.use(new bearerStrategy(
    function (token, done) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'JsonWebTokenError' && err.name === 'TokenExpiredError')
                    done(null, false)
                done(err)
            }
            done(null, decoded)
        })
    }))

module.exports = passport
