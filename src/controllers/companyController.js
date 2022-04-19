const companyModel = require('../sqlModel/companyModel')
const validate = require('../validation/company')
const {BadRequest} = require('../helper/error')

class CompanyController {
    static async AddCompany(req, res, next) {
        validate.validateInput(req.body, async (data) => {
            if (!data.isValid) {
             throw new BadRequest(data.errors)
            }})
        try {
            const { name, code } = req.body;
            const company = await companyModel.insertCompany(name, code)
            if (company == 1) {
                res.status(200).send({
                    status: true,
                    message :'Success!',
                    data : company
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


module.exports = CompanyController;