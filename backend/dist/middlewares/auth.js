"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notAuthError_1 = require("../error_classes/notAuthError");
const Auth = (req, __, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.headers.authentication || req.body.authentication) {
        try {
            const authentication = req.headers.authentication
                ? req.headers.authentication
                : req.body.authentication;
            const payload = jsonwebtoken_1.default.verify(authentication, process.env.JWT_KEY);
            req.currentUser = payload;
        }
        catch (err) {
            return next(new notAuthError_1.NotAuth("You are not authenticated"));
        }
        return next();
    }
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next(new notAuthError_1.NotAuth("You are not authenticated"));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) {
        return next(new notAuthError_1.NotAuth("You are not authenticated"));
    }
    return next();
});
exports.Auth = Auth;
