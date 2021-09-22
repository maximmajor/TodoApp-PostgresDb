"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const auth = (req, res, next) => {
    // const token: any = req.header('x-auth-token')
    const token = req.cookies.jwt;
    if (!token)
        res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get("jwtPrivateKey"));
        req.regUser = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({ error: "please you have to be Authenticated" });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map