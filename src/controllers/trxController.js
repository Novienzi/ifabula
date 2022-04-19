const trxModel = require('../sqlModel/trxModel')
const validate = require('../validation/trx')
const goodModel = require('../sqlModel/goodModel')
const { NotFound, BadRequest} = require('../helper/error')
const Json2csvParser = require("json2csv").Parser;

class TrxController {
    static async AddTrx(req, res, next) {
        validate.validateInput(req.body, async (data) => {
            if (!data.isValid) {
                res.status(400).send({
                    status: false,
                    message :'something went wrong',
                    error: data.errors
                })
            }})
        try {
            const {goodID} = req.params
            const {qty} = req.body 
            const good = await goodModel.getOneGoods(goodID)
            if (good.length < 1) {
                throw new NotFound('there is no data')
            }
            if (qty > good[0].stock) {
                throw new BadRequest('qty must less then stock')
            }
            
            const grandTotal = good[0].price * qty
            const trx = await trxModel.insertTrx(goodID, qty, grandTotal)
            if (trx.rowCount == 1) {
                res.status(200).send({
                    status: true,
                    message :'Success!',
                    data :trx.rowCount
                })
            }
        } catch (err) {
           next(err)
        }
    }

    static async download(req, res, next) {
        const now = new Date().toISOString()
        const fileName = `data_transaksi_${now}.csv`
        try {
            const res = await trxModel.getAllTransactions()
            if (res.length >= 1) {
                const jsonData = JSON.parse(JSON.stringify(res));
                const json2csvParser = new Json2csvParser({ header: true });
                json2csvParser.parse(jsonData), function(err, csv) {
                    if(err) {
                        throw err;
                    } else {
                        console.log('successfully')
                        res.setHeader(`Content-disposition', 'attachment; filename=${fileName}`);
                        res.set('Content-Type', 'text/csv');
                        res.status(200).send(csv);
                    } 
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TrxController