"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.loginPage = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registration_1 = __importDefault(require("../models/registration"));
const joiAuth_1 = __importDefault(require("../validateJoi/joiAuth"));
// TO LOGIN USER
async function loginPage(req, res) {
    const { error } = joiAuth_1.default.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let regUser = await registration_1.default.findOne({ email: req.body.email });
    //console.log(regUser);
    if (!regUser)
        return res.status(400).send("Invalid Email or Password");
    const validPassword = await bcryptjs_1.default.compare(req.body.password, regUser.password);
    //console.log(validPassword);
    if (!validPassword)
        return res.status(400).send("Password do not match");
    const token = await regUser.generateAuthToken();
    res.cookie("jwt", token);
    return res.status(200).send("You Have Been Login and Authenticated Successfully");
}
exports.loginPage = loginPage;
// TO LOGOUT USER
async function logOut(req, res) {
    try {
        let regUser = await registration_1.default.findOne({ email: req.body.email });
        regUser.tokens = [];
        regUser.token = [];
        //console.log(regUser)
        await regUser.save();
        res.cookie("jwt", "invalid");
        console.log(regUser);
        //console.log(req.regUser.tokens)
        res.send("You Have Been logged out successfully");
    }
    catch (e) {
        res.status(500).send("try again");
    }
}
exports.logOut = logOut;
//# sourceMappingURL=auth.js.map