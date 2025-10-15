"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const express_2 = require("@clerk/express");
const multer_1 = require("../utils/multer");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/sync", (0, express_2.requireAuth)(), user_controller_1.clerkUserAuth);
exports.userRouter.put("/profile", multer_1.upload.single('profilePicture'), (0, express_2.requireAuth)(), user_controller_1.updateUserProfile);
