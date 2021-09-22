"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = __importDefault(require("../middleware/auth"));
const auth_2 = require("../controller/auth");
//LOGIN PAGE
router.post("/login", auth_2.loginPage);
//LOGOUT- PAGE
router.post("/log-out", auth_1.default, auth_2.logOut);
exports.default = router;
//# sourceMappingURL=auth.js.map