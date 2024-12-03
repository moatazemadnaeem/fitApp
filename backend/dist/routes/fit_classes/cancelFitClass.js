"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fit_1 = require("../../controllers/fitController/fit");
const validateReq_1 = require("../../middlewares/validateReq");
const auth_1 = require("../../middlewares/auth");
class CancelFitClass {
    constructor() {
        this.path = "/fitclasses/cancel_class";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_1.Auth, [
            (0, express_validator_1.body)("classId")
                .isMongoId()
                .withMessage("classId must be valid mongodb id."),
        ], validateReq_1.validatereq, fit_1.fitController.cancel_book_class);
    }
}
exports.default = CancelFitClass;
