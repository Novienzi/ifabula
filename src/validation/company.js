'use strict'

const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = {
    validateInput: async (data, callback) => {
        let errors = {};
        data.name = !isEmpty(data.name) ? data.name : "";
        if (!validator.isLength(data.name, { min: 7, max: 50 })) {
            errors.name = "company name Harus diantara 7 dan 50 character";
        }

        data.code = !isEmpty(data.code) ? data.code : "";
        if (!validator.isLength(data.code, { min: 7, max: 50 })) {
            errors.code = "company name Harus diantara 7 dan 50 character";
        }
        callback({
            errors,
            isValid: isEmpty(errors)
        });

    }
}

