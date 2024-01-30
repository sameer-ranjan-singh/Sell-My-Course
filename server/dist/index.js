"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses"
};
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://sameer-course.vercel.app",
        "https://sameer-user.vercel.app",
        "http://localhost:5173",
    ]
}));
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Credentials", "Origin, X-requested-With, Content-Type, Accept");
    next();
});
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
if (typeof mongoUrl === "string") {
    console.error("Mongo URL is of type String");
    mongoose_1.default.connect(mongoUrl, mongoOptions);
    // process.exit(1)
}
app.listen(port, () => console.log(`Server is running on port ${port}`));
