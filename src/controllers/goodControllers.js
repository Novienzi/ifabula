const goodModel = require('../sqlModel/goodModel')


class GoodController {
    static async getAllGood(req, res, next) {
        try {
            const good = await goodModel.getAllGoods()
            if (good.rows.length >= 1) {
                res.status(200).send({
                    status: true,
                    message :'Success!',
                    data : good.rows
                })
            }
        } catch (err) {
            res.status(400).send({
            status: false,
            message :'something went wrong',
            error : err})
        }
    }
}

module.exports = GoodController