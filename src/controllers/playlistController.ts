import { Request, Response } from "express";
import axios from "axios";
import { IUser } from "../models/User";
import { ReducedReleaseGroup } from "../models/ReducedReleaseGroup";

interface Track {
  name: string;
  artist: string;
  album: string;
  href: string;
  imageUrl: string;
  tags?: { name: string; count: number }[];
  releaseYear?: string;
}

export const getPlaylistsWithTracks = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    if (!user) {
      return res.status(401).send("User not authenticated");
    }
    const accessToken = user.accessToken;

    // Fetch user's playlists
    const playlistsResponse = await axios.get(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playlists = playlistsResponse.data.items;

    // Fetch tracks and album details for each playlist
    const playlistsWithTracks = await Promise.all(
      playlists.map(async (playlist: any) => {
        const tracksResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const tracks = await Promise.all(
          tracksResponse.data.items.map(async (item: any) => {
            const track: Track = {
              name: item.track.name,
              artist: item.track.artists
                .map((artist: any) => artist.name)
                .join(", "),
              album: item.track.album.name,
              href: item.track.external_urls.spotify,
              imageUrl: item.track.album.images[0]?.url || "",
            };

            // Fetch album details directly from the database
            try {
              const albumDetails = await ReducedReleaseGroup.findOne({
                title: track.album,
                "artist-credit.name": track.artist,
              });
              console.log(albumDetails);
              if (albumDetails) {
                track.tags = albumDetails.tags;
                track.releaseYear = albumDetails["first-release-date"];
              }
            } catch (error) {
              console.error(
                `Error fetching album details for ${track.album}:`,
                error
              );
            }

            return track;
          })
        );

        return {
          id: playlist.id,
          name: playlist.name,
          href: playlist.href,
          images: playlist.images,
          tracks,
        };
      })
    );

    res.status(200).json(playlistsWithTracks);
  } catch (error) {
    console.error("Error fetching playlists with tracks:", error);
    res.status(500).send("Server error");
  }
};
