"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fitschema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    timePeriod: {
        type: Date,
        required: true,
    },
    maxAttendees: {
        type: Number,
        required: true,
        default: 100,
    },
    attendingUsers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
const FitClasses = mongoose_1.default.model("classes", fitschema);
exports.default = FitClasses;
