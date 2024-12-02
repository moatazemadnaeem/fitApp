"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadReqErr = void 0;
const customError_1 = require("./customError");
class BadReqErr extends customError_1.CustomError {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadReqErr.prototype);
    }
    summary() {
        return [{ msg: this.msg }];
    }
}
exports.BadReqErr = BadReqErr;
