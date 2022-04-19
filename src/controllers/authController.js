const authModel = require('../sqlModel/authModel')
const validate = require('../validation/user')
const { salt, checkPassword } = require('../helper/bycryptHelper');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const {BadRequest, NotFound, UnAuthorized} = require('../helper/error')

class AuthController {
    static async register(req, res, next) {
        validate.validateInput(req.body, async (data) => {
            if (!data.isValid) {
                res.status(400).send({
                    status: false,
                    message :'something went wrong',
                    error: data.errors
                })
            }})
        try {
            const { username, password } = req.body;
            const hashPassword = await salt(password).catch(err => {
                throw err
            })
            const user = await authModel.insertUser(username, hashPassword)
            if (user == 1) {
                res.status(200).send({
                    status: true,
                    message :'Success!',
                    data : user
                })
            }
        } catch (err) {
            next(err)
        }
    } 

    static async login(req, res, next) {
        validate.validateLoginInput(req.body, async (data) => {
            if (!data.isValid) {
                return res.status(400).send({
                    status: false,
                    message :'something went wrong',
                    data: data.errors
                });
            }})
        try {
            const body = req.body
            const getUser = await authModel.getUser(body.username)
            let data = getUser.rows
            if (data.length == 0) {
                throw new NotFound('there is no user data')
            } else {
                const isPassMatch = await checkPassword(body.password, data[0].password)
                if (!isPassMatch) {
                    throw new UnAuthorized('wrong password')
                } else {
                    const token = jwt.sign({ userID: data[0].id }, secret, { 
                        expiresIn: process.env.JWT_EXPIRED
                    });
                    delete data[0].password
                    data[0].token = token
                    res.status(200).send({
                        status: true,
                        message :'success!',
                        data : data[0]
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }

}


module.exports = AuthController;