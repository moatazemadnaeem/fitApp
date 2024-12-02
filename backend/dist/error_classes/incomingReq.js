"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateInComingReq = void 0;
const customError_1 = require("./customError");
class ValidateInComingReq extends customError_1.CustomError {
    constructor(errors) {
        super("something goes wrong with creds");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, ValidateInComingReq.prototype);
    }
    summary() {
        return this.errors.map((err) => {
            return { msg: err.msg };
        });
    }
}
exports.ValidateInComingReq = ValidateInComingReq;
