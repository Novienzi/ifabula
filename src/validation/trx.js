'use strict'

const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = {
    validateInput: async (data, callback) => {
        let errors = {}
       
        if (isNaN(data.qty)) {
            errors.qty = "Data quantity must be positive integer and more than 0"
        }
        if (data.qty <= 0) {
            errors.qty = "Data quantity must be positive integer and more than 0"
        }
        callback({
            errors,
            isValid: isEmpty(errors)
        });

    }
}

