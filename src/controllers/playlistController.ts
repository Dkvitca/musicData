import { Request, Response } from "express";
import axios from "axios";
import { IUser, User } from "../models/User";

export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;

    if (!user) {
      return res.status(401).send("User not authenticated");
    }

    const accessToken = user.accessToken;

    const response = await axios.get(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlists = response.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      href: item.href,
      images: item.images,
    }));

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).send("Server error");
  }
};

export const getPlaylistTracks = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const { playlistId } = req.params;

    if (!user) {
      return res.status(401).send("User not authenticated");
    }

    const accessToken = user.accessToken;

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tracks = response.data.items.map((item: any) => ({
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(", "),
      album: item.track.album.name,
      href: item.track.external_urls.spotify,
    }));

    res.status(200).json(tracks);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    res.status(500).send("Server error");
  }
};
