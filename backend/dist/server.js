"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const envPath = (0, path_1.resolve)("./src/.env");
dotenv.config({ path: envPath });
const app_1 = __importDefault(require("./app"));
//Auth
const createUser_1 = __importDefault(require("./routes/users/createUser"));
const signInUser_1 = __importDefault(require("./routes/users/signInUser"));
const currentUser_1 = __importDefault(require("./routes/users/currentUser"));
const signoutUser_1 = __importDefault(require("./routes/users/signoutUser"));
//Fitness
const createFitClass_1 = __importDefault(require("./routes/fit_classes/createFitClass"));
const getFitClasses_1 = __importDefault(require("./routes/fit_classes/getFitClasses"));
const editFitClass_1 = __importDefault(require("./routes/fit_classes/editFitClass"));
const deleteFitClass_1 = __importDefault(require("./routes/fit_classes/deleteFitClass"));
const bookFitClass_1 = __importDefault(require("./routes/fit_classes/bookFitClass"));
const cancelFitClass_1 = __importDefault(require("./routes/fit_classes/cancelFitClass"));
new app_1.default([
    //Users
    new createUser_1.default(),
    new signInUser_1.default(),
    new currentUser_1.default(),
    new signoutUser_1.default(),
    //fitness classes
    new createFitClass_1.default(),
    new getFitClasses_1.default(),
    new editFitClass_1.default(),
    new deleteFitClass_1.default(),
    new bookFitClass_1.default(),
    new cancelFitClass_1.default(),
], parseInt(process.env.PORT));
