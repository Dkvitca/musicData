import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import { keys } from "./config/keys";
import { router } from "./routes";
import path from "path";
import "./services/passport";
import cors from "cors";

const app = express();

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(router);

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, "views")));

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err.stack);
    res.status(500).send("Something broke!");
  }
);

export { app };
