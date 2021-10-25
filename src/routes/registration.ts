
import createHttpError from "http-errors";
import { model, now } from "mongoose";
import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
//import createError from 'http-errors'
const router = Router();
import registration from "../models/registration";
import regSchema from "../validateJoi/joiValidate"
import auth from "../middleware/auth"
import { getRegisteredUser, signUp } from "../controller/registration"


// Get all registered users
router.get(
    "/", auth, getRegisteredUser);


  //SIGN-UP
  router.post(
       "/sign-up", signUp);
       

  export default router;


