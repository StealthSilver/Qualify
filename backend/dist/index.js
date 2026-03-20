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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const middlewares_1 = require("./middlewares");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middlewares_1.logger);
app.use(middlewares_1.validateRequest);
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Spardha API",
        version: "1.0.0",
    });
});
app.use(middlewares_1.errorHandler);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, config_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}/api`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
});
startServer();
