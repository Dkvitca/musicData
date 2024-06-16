import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  spotifyId: string;
  displayName: string;
  accessToken: string;
  refreshToken: string;
}

const userSchema: Schema = new Schema({
  spotifyId: { type: String, required: true },
  displayName: { type: String },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
