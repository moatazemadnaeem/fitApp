"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const customError_1 = require("./customError");
class NotFound extends customError_1.CustomError {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    summary() {
        return [{ msg: this.msg }];
    }
}
exports.NotFound = NotFound;
