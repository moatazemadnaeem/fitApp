"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.hashPass = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const hashPass = (pass) => {
    const salt = bcrypt_nodejs_1.default.genSaltSync();
    const hashedpassword = bcrypt_nodejs_1.default.hashSync(pass, salt);
    return hashedpassword;
};
exports.hashPass = hashPass;
const comparePass = (clientpass, dbpass) => {
    const validate = bcrypt_nodejs_1.default.compareSync(clientpass, dbpass);
    return validate;
};
exports.comparePass = comparePass;
