import dotenv from "dotenv";

dotenv.config();

export const keys = {
  spotifyClientID: process.env.SPOTIFY_CLIENT_ID!,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  mongoURI: process.env.MONGO_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
  callbackURL: process.env.CALLBACK_URL!,
};
