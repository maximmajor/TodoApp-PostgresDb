"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import createError from 'http-errors'
const router = (0, express_1.Router)();
const auth_1 = __importDefault(require("../middleware/auth"));
const registration_1 = require("../controller/registration");
// Get all registered users
router.get("/", auth_1.default, registration_1.getRegisteredUser);
//SIGN-UP
router.post("/sign-up", registration_1.signUp);
exports.default = router;
//# sourceMappingURL=registration.js.map