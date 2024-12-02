"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/userController/user");
const auth_1 = require("../../middlewares/auth");
class CurrentUser {
    constructor() {
        this.path = "/users/current_user";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_1.Auth, user_1.userController.current);
    }
}
exports.default = CurrentUser;
