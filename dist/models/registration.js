"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const RegistrationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});
RegistrationSchema.methods.generateAuthToken = async function () {
    const regUser = this;
    const token = jsonwebtoken_1.default.sign({ _id: regUser._id.toString() }, config_1.default.get("jwtPrivateKey"), { expiresIn: "3600 seconds" });
    regUser.tokens = regUser.tokens.concat({ token });
    await regUser.save();
    return token;
};
const registration = mongoose_1.default.model("registration", RegistrationSchema);
exports.default = registration;
//# sourceMappingURL=registration.js.map