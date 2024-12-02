"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../../controllers/userController/user");
const validateReq_1 = require("../../middlewares/validateReq");
class CreateUser {
    constructor() {
        this.path = "/users/create_user";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, [
            (0, express_validator_1.body)("name")
                .trim()
                .isLength({ min: 3, max: 255 })
                .withMessage("name must be at least 3 chars long and 255 max"),
            (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
            (0, express_validator_1.body)("password")
                .trim()
                .isLength({ min: 6, max: 255 })
                .withMessage("Password must be at least 6 chars long and 255 max"),
        ], validateReq_1.validatereq, user_1.userController.create_user);
    }
}
exports.default = CreateUser;
