import mongoose from "mongoose";
import log from "../logger";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  const mongoUri = process.env.DB_URI_MONGO as string;
  try {
        await mongoose
            .connect(mongoUri);
        log.info("Mongodb database connected");
    } catch (error) {
        log.error("DB error", error.toString());
    }
}

export default connect;