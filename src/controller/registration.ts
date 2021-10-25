import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
const router = Router();
import registration from "../models/registration";
import regSchema from "../validateJoi/joiValidate";

// SIGN UP USER
export async function signUp(
  req: express.Request,
  res: express.Response,
) {
  // const { name, email, password } = req.body
  const { error } = regSchema.validate(req.body);
  //console.log(result.error.message)
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  let regUser: any = new registration({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const existUser = await registration.findOne({ email: req.body.email });
  //console.log(existUser)
  if (!existUser) {
    res.send("User created successfully");
    await regUser.save();
    const token = await regUser.generateAuthToken();
    return res.status(200).send({ regUser, token });
  } else {
    return res.status(400).send("User already registered");
  }
}

//GET ALL REGISTERED USERS
export async function getRegisteredUser(
  req: any,
  res: express.Response,
) {
  try {
    const data = await registration.find();

    res.status(200).send({
      data: data,
    });
  } catch (e) {
    //console.log("Error", e)
    res.status(500).send({
      data: null,
    });
  }
}
