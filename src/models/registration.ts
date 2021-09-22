import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
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
  const token = jwt.sign(
    { _id: regUser._id.toString() },
    config.get("jwtPrivateKey"),
    { expiresIn: "3600 seconds" }
  );

  regUser.tokens = regUser.tokens.concat({ token });
  await regUser.save();
  return token;
};

const registration = mongoose.model("registration", RegistrationSchema);

export default registration;
