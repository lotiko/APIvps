import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import log from "./logger";
import connect from "./db/conn";
import routes from "./routes";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`API listen on port: ${port}.`);
  connect();
  routes(app);
});

// define a route handler for the default home page
// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });
