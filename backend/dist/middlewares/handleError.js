"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const customError_1 = require("../error_classes/customError");
const handleError = (err, req, res, next) => {
    if (err instanceof customError_1.CustomError) {
        res.status(err.statusCode).send(err.summary());
    }
    else {
        res.status(400).send([{ msg: err.message }]);
    }
};
exports.handleError = handleError;
