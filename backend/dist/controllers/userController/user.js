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
exports.userController = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const badReqError_1 = require("../../error_classes/badReqError");
const passowrd_1 = require("../../utils/passowrd");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notFoundError_1 = require("../../error_classes/notFoundError");
class UserController {
    create_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const exists = yield userModel_1.default.findOne({ email });
                if (exists) {
                    throw new badReqError_1.BadReqErr("Email is already in use");
                }
                yield userModel_1.default.create({
                    name,
                    email,
                    password: (0, passowrd_1.hashPass)(password),
                });
                res.status(201).send({
                    status: true,
                    msg: "User Created Successfully.",
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    signIn_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                //if user does not exist
                const existingUser = yield userModel_1.default.findOne({ email });
                if (!existingUser) {
                    throw new badReqError_1.BadReqErr("invalid creds can not find user ");
                }
                //check password
                const validate = (0, passowrd_1.comparePass)(password, existingUser.password);
                if (!validate) {
                    throw new badReqError_1.BadReqErr("invalid creds  error in password");
                }
                const token = jsonwebtoken_1.default.sign({
                    id: existingUser._id,
                }, process.env.JWT_KEY, { expiresIn: "1d" });
                req.session = {
                    jwt: token,
                };
                res.status(200).send({
                    name: existingUser.name,
                    email: existingUser.email,
                    token,
                    status: true,
                    msg: "Done Signing In.",
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session = null;
            res.send({
                token: null,
                currentUser: null,
            });
        });
    }
    current(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.currentUser) {
                try {
                    const user = yield userModel_1.default.findById(req.currentUser.id);
                    if (user) {
                        const { name, email, _id } = user;
                        res.send({
                            name,
                            email,
                            id: _id,
                            status: true,
                        });
                    }
                    else {
                        throw new notFoundError_1.NotFound("this user can not be found");
                    }
                }
                catch (err) {
                    throw new badReqError_1.BadReqErr(err.message);
                }
            }
            else {
                res.send({ currentUser: null });
            }
        });
    }
}
exports.userController = new UserController();
