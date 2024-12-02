"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const badReqError_1 = require("./error_classes/badReqError");
const notFoundError_1 = require("./error_classes/notFoundError");
const handleError_1 = require("./middlewares/handleError");
class App {
    constructor(routers, port) {
        this.express = (0, express_1.default)();
        this.port = port || 9000;
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeRouters(routers);
        this.initializeErrorHandling();
    }
    initializeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.JWT_KEY) {
                throw new badReqError_1.BadReqErr("Jwt is not defined");
            }
            try {
                yield mongoose_1.default.connect(process.env.DB_URL);
                console.log("connected to db");
                this.listen();
            }
            catch (err) {
                console.log(err, "err to connect");
            }
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`listening in port ${this.port}`);
        });
    }
    initializeMiddleware() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use((0, cookie_session_1.default)({
            signed: false,
            maxAge: 24 * 60 * 60 * 1000,
        }));
    }
    initializeRouters(routers) {
        routers.forEach((routerInstance) => {
            this.express.use("/api/v1", routerInstance.router);
        });
        this.express.all("*", () => {
            throw new notFoundError_1.NotFound("can not find this page please try again");
        });
    }
    initializeErrorHandling() {
        this.express.use(handleError_1.handleError);
    }
}
exports.default = App;
