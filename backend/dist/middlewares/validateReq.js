"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatereq = void 0;
const express_validator_1 = require("express-validator");
const incomingReq_1 = require("../error_classes/incomingReq");
const validatereq = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        throw new incomingReq_1.ValidateInComingReq(error.array());
    }
    next();
};
exports.validatereq = validatereq;
