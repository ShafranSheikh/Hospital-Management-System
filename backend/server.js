import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import env from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json());

env.config();

//Database connection
const MONGODB =process.env.MONGODB_URL;
mongoose
  .connect(MONGODB)
  .then(() => console.log("Connected to mongo Db."))
  .catch((err) => console.error("MongoDb Connection Error:", err));

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
