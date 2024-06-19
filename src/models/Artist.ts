// src/models/Artist.ts

import mongoose, { Schema, Document } from "mongoose";

interface Tag {
  name: string;
  count: number;
}

interface Alias {
  name: string;
  sortName: string;
}

interface Relation {
  type: string;
  artist: {
    id: string;
    name: string;
    sortName: string;
  };
}

export interface IArtist extends Document {
  sortName: string;
  country: string;
  gender: string;
  lifeSpan: {
    begin: string;
    end: string | null;
  };
  tags: Tag[];
  genres: string[];
  aliases: Alias[];
  relations: Relation[];
}

const artistSchema: Schema = new Schema({
  sortName: { type: String, required: true },
  country: { type: String },
  gender: { type: String },
  lifeSpan: {
    begin: { type: String },
    end: { type: String, default: null },
  },
  tags: [
    {
      name: { type: String, required: true },
      count: { type: Number, required: true },
    },
  ],
  genres: [{ type: String }],
  aliases: [
    {
      name: { type: String, required: true },
      sortName: { type: String, required: true },
    },
  ],
  relations: [
    {
      type: { type: String },
      artist: {
        id: { type: String },
        name: { type: String },
        sortName: { type: String },
      },
    },
  ],
});

export const Artist = mongoose.model<IArtist>("artists", artistSchema);
