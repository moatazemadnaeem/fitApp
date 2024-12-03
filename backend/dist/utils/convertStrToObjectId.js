"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const convertStrToObjID = (value) => {
    return new mongoose_1.default.Types.ObjectId(value);
};
exports.default = convertStrToObjID;
