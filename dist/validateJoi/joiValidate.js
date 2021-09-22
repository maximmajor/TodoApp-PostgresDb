"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const regSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(50).required(),
    email: joi_1.default.string().min(5).max(255).required().email(),
    password: joi_1.default.string().min(5).max(255).required()
});
exports.default = regSchema;
//# sourceMappingURL=joiValidate.js.map