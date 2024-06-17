import mongoose, { Schema, Document } from "mongoose";

interface Tag {
  name: string;
  count: number;
}

export interface IReducedReleaseGroup extends Document {
  title: string;
  "artist-credit": { artist: { name: string } }[];
  "first-release-date": string;
  "primary-type": string;
  tags: Tag[];
}

const ReducedReleaseGroupSchema: Schema = new Schema({
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
});

export const ReducedReleaseGroup = mongoose.model<IReducedReleaseGroup>(
  "ReducedReleaseGroup",
  ReducedReleaseGroupSchema,
  "reduced_release_group"
);
