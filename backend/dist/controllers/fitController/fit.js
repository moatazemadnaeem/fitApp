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
exports.fitController = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const fitnessModel_1 = __importDefault(require("../../models/fitnessModel"));
const badReqError_1 = require("../../error_classes/badReqError");
const notFoundError_1 = require("../../error_classes/notFoundError");
const convertStrToObjectId_1 = __importDefault(require("../../utils/convertStrToObjectId"));
const notAuthError_1 = require("../../error_classes/notAuthError");
const lodash_1 = __importDefault(require("lodash"));
class FitController {
    create_class(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const user = yield userModel_1.default.findById(userId);
                if (!user) {
                    throw new notFoundError_1.NotFound("this user can not be found");
                }
                yield fitnessModel_1.default.create(Object.assign({ userId }, req.body));
                res.status(201).send({
                    status: true,
                    msg: "Fitness class Created Successfully.",
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    read_classes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.body.page || 1;
                const limit = page * 10;
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const fitclasses = yield fitnessModel_1.default.find({
                    startDate: { $gte: now },
                }).limit(limit);
                res.send({
                    msg: "Done sending all fitness classes",
                    fitclasses,
                    status: true,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    edit_class(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { classId } = req.body;
                const { title, description, startDate, timePeriod, maxAttendees } = req.body;
                const body = {
                    title,
                    description,
                    startDate,
                    timePeriod,
                    maxAttendees,
                };
                const filteredBody = lodash_1.default.omitBy(body, lodash_1.default.isUndefined);
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const classfound = yield fitnessModel_1.default.findById(classId);
                if (!classfound) {
                    throw new notFoundError_1.NotFound("this fitness class can not be found");
                }
                if (classfound.userId.toString() !== userId) {
                    throw new notAuthError_1.NotAuth("You can not edit class that not yours");
                }
                if (classfound.attendingUsers.length > maxAttendees) {
                    throw new notAuthError_1.NotAuth("maxAttendees must be bigger than attending users");
                }
                const updatePortion = Object.assign(Object.assign({}, classfound.toObject()), filteredBody);
                const updatedFitClass = yield fitnessModel_1.default.findOneAndUpdate({
                    _id: classId,
                }, { $set: updatePortion }, { new: true });
                res.send({
                    msg: "Done updating fitness class",
                    status: true,
                    updatedFitClass,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    delete_class(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { classId } = req.body;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const classfound = yield fitnessModel_1.default.findById(classId);
                if (!classfound) {
                    throw new notFoundError_1.NotFound("this fitness class can not be found");
                }
                if (classfound.userId.toString() !== userId) {
                    throw new notAuthError_1.NotAuth("You can not delete class that not yours");
                }
                const deletedFitClass = yield fitnessModel_1.default.findOneAndDelete({
                    _id: classId,
                });
                if (!deletedFitClass) {
                    throw new notFoundError_1.NotFound("this fit class can not be found");
                }
                res.send({
                    msg: "Done deleting fitness class",
                    status: true,
                    deletedFitClass,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    book_class(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { classId } = req.body;
                const userId = req.currentUser.id;
                const classFound = yield fitnessModel_1.default.findById(classId);
                if (!classFound) {
                    throw new badReqError_1.BadReqErr("Class can not be found");
                }
                if (classFound.attendingUsers.length === classFound.maxAttendees) {
                    throw new badReqError_1.BadReqErr("Can not book the class becauseits full");
                }
                const FitClassNoUser = yield fitnessModel_1.default.find({
                    _id: classId,
                    attendingUsers: { $in: userId },
                });
                if (FitClassNoUser[0]) {
                    throw new badReqError_1.BadReqErr("Can not book the class because you already booked it");
                }
                if (classFound.userId.toString() === userId) {
                    throw new badReqError_1.BadReqErr("You can not book yourself you are the owner of this class");
                }
                classFound.attendingUsers.push((0, convertStrToObjectId_1.default)(userId));
                yield classFound.save();
                res.send({
                    msg: "Done Booking the class",
                    status: true,
                    classBooked: classFound,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    cancel_book_class(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { classId } = req.body;
                const userId = req.currentUser.id;
                const classFound = yield fitnessModel_1.default.findById(classId);
                if (!classFound) {
                    throw new badReqError_1.BadReqErr("Class can not be found");
                }
                const FitClassNoUser = yield fitnessModel_1.default.find({
                    _id: classId,
                    attendingUsers: { $in: userId },
                });
                if (!FitClassNoUser[0]) {
                    throw new badReqError_1.BadReqErr("You can not cancel the class because you did not book it");
                }
                const attUsers = classFound.attendingUsers.filter((att) => att.toString() !== userId);
                classFound.attendingUsers = attUsers;
                yield classFound.save();
                res.send({
                    msg: "Done Canceling the class",
                    status: true,
                    classCanceled: classFound,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    get_booked_classes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const page = req.body.page || 1;
                const id = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const limit = page * 10;
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const fitclasses = yield fitnessModel_1.default.find({
                    timePeriod: { $gte: now },
                    attendingUsers: { $in: [id] },
                }).limit(limit);
                res.send({
                    msg: "Done sending all booked fitness classes",
                    fitclasses,
                    status: true,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
    get_created_classes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const page = req.body.page || 1;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const limit = page * 10;
                const fitclasses = yield fitnessModel_1.default.find({
                    userId,
                }).limit(limit);
                res.send({
                    msg: "Done sending all booked fitness classes",
                    fitclasses,
                    status: true,
                });
            }
            catch (error) {
                throw new badReqError_1.BadReqErr(error.message);
            }
        });
    }
}
exports.fitController = new FitController();
