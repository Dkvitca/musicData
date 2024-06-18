// src/models/ReleaseGroup.ts

import mongoose, { Schema, Document } from "mongoose";

interface Tag {
  name: string;
  count: number;
}

interface Genre {
  name: string;
}

export interface IReleaseGroup extends Document {
  title: string;
  "artist-credit": { artist: { name: string } }[];
  "first-release-date": string;
  "primary-type": string;
  tags: Tag[];
  genres: Genre[];
}

const ReleaseGroupSchema: Schema = new Schema({
  title: { type: String, required: true },
  "artist-credit": [
    {
      artist: {
        name: { type: String, required: true },
      },
    },
  ],
  "first-release-date": { type: String, required: true },
  "primary-type": { type: String, required: true },
  tags: [
    {
      name: { type: String, required: true },
      count: { type: Number, required: true },
    },
  ],
  genres: [
    {
      name: { type: String, required: true },
    },
  ],
});

export const ReleaseGroup = mongoose.model<IReleaseGroup>(
  "ReleaseGroup",
  ReleaseGroupSchema,
  "release_group"
);
