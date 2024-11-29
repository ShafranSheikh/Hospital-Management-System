import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import env from 'dotenv';
import { ExtractJwt, Strategy as JwtStratergy } from "passport-jwt";
import passport from "passport";
import User from "./models/UserSchema.js";
import Blacklist from "./models/blacklistSchema.js";
import UserRouter from './routes/userRoutes.js'
import patientRouter from './routes/patientRoutes.js'
const app = express();
env.config();

//midleware
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
app.use(passport.initialize());


//Database connection
const MONGODB =process.env.MONGODB_URL;
mongoose
  .connect(MONGODB)
  .then(() => console.log("Connected to mongo Db."))
  .catch((err) => console.error("MongoDb Connection Error:", err.message));


  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_AUTH || 'defaultSecret',
  };
  
passport.use(
    new JwtStratergy(opts, async (payload, done) => {
        try {
            
            const user = await User.findById(payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: "User not found" });
            }
        } catch (error) {
            return done(error);
        }
    })
);

// Routes
app.use('/api/auth', UserRouter);
app.use('/api/patient', patientRouter)

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
