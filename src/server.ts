import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import log from "./logger";
import connect from "./db/conn";
import r_2048 from "./routes/2048";
import r_linkedin from "./routes/linkedin";
import cors from 'cors';

dotenv.config();
const port = process.env.SERVER_PORT;
const mongoUri = String(process.env.DB_URI_MONGO);
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000', "https://runloweb.re"]
}));
connect(mongoUri);
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/API/2048", r_2048)
  .use("/API/linkedin", r_linkedin)
  .listen(port, () => {
    log.info(`API listen on port: ${port}.`);
  });

// define a route handler for the default home page
// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });
