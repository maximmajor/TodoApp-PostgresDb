import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
import registration from "../models/registration";
import loginSchema from "../validateJoi/joiAuth";

// TO LOGIN USER
export async function loginPage(req: express.Request, res: express.Response) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let regUser: any = await registration.findOne({ email: req.body.email });
  console.log(regUser);
  if (!regUser) return res.status(400).send("Invalid Email or Password");
  const validPassword: any = await bcrypt.compare(
    req.body.password,
    regUser.password
  );
  console.log(validPassword);
  if (!validPassword) return res.status(400).send("Password do not match");
  const token = await regUser.generateAuthToken();
  res.cookie("jwt", token);
  return res.redirect("/todos");
}

// TO LOGOUT USER
export async function logOut(req: any, res: express.Response) {
  try {
    req.regUser.tokens = [];
    await req.regUser.save();
    res.send("userlogged out successfully");
  } catch (e) {
    res.status(500).send("try again");
  }
}
