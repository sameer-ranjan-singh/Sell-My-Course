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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
const index_js_1 = require("../db/index.js");
const zod_1 = __importDefault(require("zod"));
const router = express_1.default.Router();
let signupInputProp = zod_1.default.object({
    username: zod_1.default.string().min(2).max(10),
    password: zod_1.default.string().min(2).max(10)
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({
        message: "Hello from Render.com / sameer",
    });
}));
router.get("/me", auth_2.authenticateJwt, (req, res) => {
    res.json({
        username: req.user.username
    });
});
// SIGNUP  
router.post('/signup', (req, res) => {
    /* zod validation */
    const parsedInput = signupInputProp.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            error: parsedInput.error
        });
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    // const { username, password } = req.body;
    function callback(admin) {
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        }
        else {
            const obj = { username: username, password: password };
            const newAdmin = new index_js_1.Admin(obj);
            newAdmin.save();
            const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token });
        }
    }
    index_js_1.Admin.findOne({ username }).then(callback);
});
// LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield index_js_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '3h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
// CREATE COURSE  
router.post('/courses', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new index_js_1.Course(req.body);
    yield course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
}));
// EDIT COURSE
router.put('/courses/:courseId', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_js_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
// GET ALL COURSES
router.get('/courses', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield index_js_1.Course.find({});
    res.json({ courses });
}));
// GET SINGLE COURSE  
router.get("/course/:courseId", auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield index_js_1.Course.findById(courseId);
    res.json({ course });
}));
// DELETE A COURSE
router.delete("/courses/:courseId", auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const deletedCourse = yield index_js_1.Course.findByIdAndDelete(courseId, req.body, { new: true });
    try {
        if (!deletedCourse) {
            res.status(404).json({ message: "course not found" });
        }
        res.json({ message: "Course deleted successfully", deletedCourse });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
}));
exports.default = router;
// module.exports = router
