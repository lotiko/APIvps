import express, { Request, Response, NextFunction } from "express";
import log from "../logger";
import dotenv from "dotenv";
import axios from "axios";
import { readFileSync } from 'fs';
import * as path from 'path';
import linkdata from "../data/linkedin.json";
dotenv.config();
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  log.info("TEST");
    res.send(linkdata);
    next();
});
export default router;
