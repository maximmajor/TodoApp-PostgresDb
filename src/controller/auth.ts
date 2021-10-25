import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
import registration from "../models/registration";
import loginSchema from "../validateJoi/joiAuth";

// TO LOGIN USER
export async function loginPage(req: express.Request, res: express.Response) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let regUser: any = await registration.findOne({ email: req.body.email });
  //console.log(regUser);
  if (!regUser) return res.status(400).send("Invalid Email or Password");
  const validPassword: any = await bcrypt.compare(
    req.body.password,
    regUser.password
  );
  //console.log(validPassword);
  if (!validPassword) return res.status(400).send("Password do not match");
  const token = await regUser.generateAuthToken();
  res.cookie("jwt", token);
  return  res.status(200).send("You Have Been Login and Authenticated Successfully");
}

// TO LOGOUT USER
export async function logOut(req: any, res: express.Response) {
  try {
    let regUser: any = await registration.findOne({ email: req.body.email });
    regUser.tokens = [];
    regUser.token = [];
    //console.log(regUser)
    await regUser.save();
    res.cookie("jwt", "invalid");
    console.log(regUser)
    //console.log(req.regUser.tokens)
    res.send("You Have Been logged out successfully");
  } catch (e) {
    res.status(500).send("try again");
  }
}
