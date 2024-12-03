"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fit_1 = require("../../controllers/fitController/fit");
const validateReq_1 = require("../../middlewares/validateReq");
const auth_1 = require("../../middlewares/auth");
class DeleteFitClass {
    constructor() {
        this.path = "/fitclasses/delete_class";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.delete(`${this.path}`, auth_1.Auth, [
            (0, express_validator_1.body)("classId")
                .isMongoId()
                .withMessage("classId must be valid mongodb id."),
        ], validateReq_1.validatereq, fit_1.fitController.delete_class);
    }
}
exports.default = DeleteFitClass;
