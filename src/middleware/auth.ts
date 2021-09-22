import registration from "../models/registration";
import express, { request, Router } from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { defaults } from "joi";

const auth = (req: any, res: express.Response, next: NextFunction) => {
  // const token: any = req.header('x-auth-token')
  const token: any = req.cookies.jwt;
  if (!token) res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.regUser = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: "please you have to be Authenticated" });
  }
};

export default auth;
