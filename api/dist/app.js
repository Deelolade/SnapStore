"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./routes/user.route");
const express_2 = require("@clerk/express");
const product_route_1 = require("./routes/product.route");
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const store_route_1 = require("./routes/store.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.FRONTEND_URL,
    credentials: true,
}));
const PORT = 3000;
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
app.get("/", (req, res) => {
    res.json("hello world !!");
});
app.use("/api/user", user_route_1.userRouter);
app.use("/api/product", product_route_1.productRouter);
app.use("/api/store", store_route_1.storeRouter);
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});
