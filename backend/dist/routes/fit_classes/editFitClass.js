"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fit_1 = require("../../controllers/fitController/fit");
const validateReq_1 = require("../../middlewares/validateReq");
const auth_1 = require("../../middlewares/auth");
class EditFitClass {
    constructor() {
        this.path = "/fitclasses/edit_class";
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
        this.router.patch(`${this.path}`, auth_1.Auth, [
            (0, express_validator_1.body)("classId")
                .isMongoId()
                .withMessage("classId must be valid mongodb id."),
            (0, express_validator_1.body)("title")
                .optional()
                .trim()
                .isLength({ min: 3, max: 255 })
                .withMessage("title must be at least 3 chars long and 255 max"),
            (0, express_validator_1.body)("description")
                .optional()
                .trim()
                .isLength({ min: 3 })
                .withMessage("description must be at least 3 chars long"),
            (0, express_validator_1.body)("startDate")
                .optional()
                .isISO8601()
                .withMessage("startDate must be a valid date ex:YYYY-MM-DD")
                .custom((value) => {
                const inputDate = new Date(value);
                const currentDate = new Date();
                inputDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
                if (inputDate < currentDate) {
                    throw new Error("startDate must be greater than the current date");
                }
                return true;
            }),
            (0, express_validator_1.body)("timePeriod")
                .optional()
                .isISO8601()
                .withMessage("timePeriod must be a valid date ex:YYYY-MM-DD")
                .custom((value, { req }) => {
                const endDate = new Date(value);
                const startDate = new Date(req.body.startDate);
                endDate.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                if (endDate < startDate) {
                    throw new Error("timePeriod must be greater or equal than the start date date");
                }
                return true;
            }),
            (0, express_validator_1.body)("maxAttendees").optional().custom(this.checkMaxAttendees),
        ], validateReq_1.validatereq, fit_1.fitController.edit_class);
    }
}
exports.default = EditFitClass;
