"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegisteredUser = exports.signUp = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
const registration_1 = __importDefault(require("../models/registration"));
const joiValidate_1 = __importDefault(require("../validateJoi/joiValidate"));
// SIGN UP USER
async function signUp(req, res) {
    // const { name, email, password } = req.body
    const { error } = joiValidate_1.default.validate(req.body);
    //console.log(result.error.message)
    if (error)
        return res.status(400).send(error.details[0].message);
    const salt = await bcryptjs_1.default.genSalt(10);
    req.body.password = await bcryptjs_1.default.hash(req.body.password, salt);
    let regUser = new registration_1.default({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const existUser = await registration_1.default.findOne({ email: req.body.email });
    //console.log(existUser)
    if (!existUser) {
        res.send("User created successfully");
        await regUser.save();
        const token = await regUser.generateAuthToken();
        return res.status(200).send({ regUser, token });
    }
    else {
        return res.status(400).send("User already registered");
    }
}
exports.signUp = signUp;
//GET ALL REGISTERED USERS
async function getRegisteredUser(req, res) {
    try {
        const data = await registration_1.default.find();
        res.status(200).send({
            data: data,
        });
    }
    catch (e) {
        //console.log("Error", e)
        res.status(500).send({
            data: null,
        });
    }
}
exports.getRegisteredUser = getRegisteredUser;
//# sourceMappingURL=registration.js.map