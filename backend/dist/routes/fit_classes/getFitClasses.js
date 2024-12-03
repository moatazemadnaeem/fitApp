"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fit_1 = require("../../controllers/fitController/fit");
const validateReq_1 = require("../../middlewares/validateReq");
class GetFitClasses {
    constructor() {
        this.path = "/fitclasses/get_classes";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    checkPage(value) {
        if (!Number.isInteger(value)) {
            throw new Error("Page must be valid integer.");
        }
        if (value < 1) {
            throw new Error("Page must not be less than one.");
        }
        return true;
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, [
            (0, express_validator_1.body)("page")
                .exists()
                .withMessage("page must exist")
                .bail()
                .custom(this.checkPage),
        ], validateReq_1.validatereq, fit_1.fitController.read_classes);
    }
}
exports.default = GetFitClasses;
