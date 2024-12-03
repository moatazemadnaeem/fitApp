"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fit_1 = require("../../controllers/fitController/fit");
const validateReq_1 = require("../../middlewares/validateReq");
const auth_1 = require("../../middlewares/auth");
class CreateFitClass {
    constructor() {
        this.path = "/fitclasses/create_class";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    checkMaxAttendees(value) {
        if (!Number.isInteger(value)) {
            throw new Error("Max attendees must be valid integer.");
        }
        if (value < 1) {
            throw new Error("Max attendees must not be less than one.");
        }
        return true;
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_1.Auth, [
            (0, express_validator_1.body)("title")
                .trim()
                .isLength({ min: 3, max: 255 })
                .withMessage("title must be at least 3 chars long and 255 max"),
            (0, express_validator_1.body)("description")
                .trim()
                .isLength({ min: 3 })
                .withMessage("description must be at least 3 chars long"),
            (0, express_validator_1.body)("startDate")
                .isISO8601()
                .withMessage("startDate must be a valid date ex:YYYY-MM-DD")
                .custom((value) => {
                if (new Date(value) < new Date()) {
                    throw new Error("startDate must be greater than the current date");
                }
                return true;
            }),
            (0, express_validator_1.body)("timePeriod")
                .isISO8601()
                .withMessage("timePeriod must be a valid date ex:YYYY-MM-DD")
                .custom((value, { req }) => {
                if (value < req.body.startDate) {
                    throw new Error("timePeriod must be greater or equal than the start date date");
                }
                return true;
            }),
            (0, express_validator_1.body)("maxAttendees")
                .exists()
                .withMessage("maxAttendees must exist")
                .custom(this.checkMaxAttendees),
        ], validateReq_1.validatereq, fit_1.fitController.create_class);
    }
}
exports.default = CreateFitClass;
