"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuth = void 0;
const customError_1 = require("./customError");
class NotAuth extends customError_1.CustomError {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuth.prototype);
    }
    summary() {
        return [{ msg: this.msg }];
    }
}
exports.NotAuth = NotAuth;
