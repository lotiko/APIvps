import express, { Request, Response, NextFunction } from "express";
import log from "../logger";
import dotenv from "dotenv";
import axios from "axios";
import { readFile } from 'fs/promises';
import { createRequire } from "module";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const linkdata = require("../../linkedin.json");
dotenv.config();
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  log.info("TEST");
  try {
    // const init = {
    //   headers: {
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     // Connection: "Keep-Alive",
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
    //   },
    // };
    // const init2 = {
    //   headers: {
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     // "Content-Type": "application/x-www-form-urlencoded",
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     // "Authorization": `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
    //   },
    //   data: {
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     grant_type: "client_credentials",
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     client_id: "86ddr6a89c8zxo",
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     client_secret: "TQzzOINvI8iq4ZXJ",
    //   },
    // };
    // // const data = await axios.post(`https://www.linkedin.com/oauth/v2/authorization`, init2);
    // const data = await axios.get(`https://api.linkedin.com/v2/me`, init);
    res.send(linkdata);
    return;
  } catch (error) {
    log.error(error);
    return;
  }
});
export default router;
