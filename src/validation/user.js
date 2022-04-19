'use strict'

const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = {
    validateInput: async (data, callback) => {
        let errors = {};
        data.username = !isEmpty(data.username) ? data.username : "";
        data.password = !isEmpty(data.password) ? data.password : "";

        if (!validator.isLength(data.username, { min: 3, max: 50 })) {
            errors.username = "username Harus diantara 3 dan 50 character";
        }

        if (!validator.isLength(data.password, { min: 6, max: 50 })) {
            errors.password = "Password minimal 6 character";
        }

        if (validator.isEmpty(data.password)) {
            errors.password = "Data password required";
        }

        callback({
            errors,
            isValid: isEmpty(errors)
        });

    },
    validateLoginInput: async (data, callback) => {
        let errors = {};

        data.username = !isEmpty(data.username) ? data.username : "";
        data.password = !isEmpty(data.password) ? data.password : "";

        if (!validator.isLength(data.password, { min: 3, max: 50 })) {
            errors.password = "Password minimal 3 character";
        }

        if (validator.isEmpty(data.password)) {
            errors.password = "Data Password required";
        }

        callback({
            errors,
            isValid: isEmpty(errors)
        });
    },
}