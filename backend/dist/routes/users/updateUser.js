"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/userController/user");
const auth_1 = require("../../middlewares/auth");
const express_validator_1 = require("express-validator");
const validateReq_1 = require("../../middlewares/validateReq");
class UpdateUser {
    constructor() {
        this.path = "/users/edit_user";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.patch(`${this.path}`, auth_1.Auth, [
            (0, express_validator_1.body)("name")
                .optional()
                .trim()
                .isLength({ min: 3, max: 255 })
                .withMessage("name must be at least 3 chars long and 255 max"),
            (0, express_validator_1.body)("password")
                .optional()
                .trim()
                .isLength({ min: 6, max: 255 })
                .withMessage("Password must be at least 6 chars long and 255 max"),
        ], validateReq_1.validatereq, user_1.userController.edit_user);
    }
}
exports.default = UpdateUser;
