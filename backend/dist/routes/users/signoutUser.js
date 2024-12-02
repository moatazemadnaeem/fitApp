"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/userController/user");
class SignOut {
    constructor() {
        this.path = "/users/signout";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, user_1.userController.signout);
    }
}
exports.default = SignOut;
