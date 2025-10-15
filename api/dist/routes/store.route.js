"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const express_1 = __importDefault(require("express"));
const store_controller_1 = require("../controllers/store.controller");
exports.storeRouter = express_1.default.Router();
exports.storeRouter.get("/:storeSlug", store_controller_1.getSellerStore);
