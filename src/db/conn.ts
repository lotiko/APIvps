import Mongoose from "mongoose";
import log from "../logger";

export default (db: string) => {
  const connect = () => {
    Mongoose
      .connect(db)
      .then(() => {
        return log.info(`Successfully connected to Database`);
      })
      .catch((error) => {
        log.error(error);
        return process.exit(1);
      });
  };
  connect();

  Mongoose.connection.on("disconnected", connect);
};
