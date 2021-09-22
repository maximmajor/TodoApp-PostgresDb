import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
const router = Router();
import registration from "../models/registration";
import loginSchema from "../validateJoi/joiAuth";
import auth from "../middleware/auth";
import { loginPage, logOut } from "../controller/auth";

//LOGIN PAGE
router.post("/login", loginPage);

//LOGOUT- PAGE
router.post("/log-out", auth, logOut);
export default router;
