import { Request, Response } from "express";
import axios from "axios";
import { IUser } from "../models/User";
import { ReducedReleaseGroup } from "../models/ReducedReleaseGroup";
import stringSimilarity from "string-similarity";

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

            // Fetch all potential matches from the database
            const potentialMatches = await ReducedReleaseGroup.find({
              "artist-credit.name": track.artist,
            });

            if (potentialMatches.length > 0) {
              // Find the closest matching album title
              const titles = potentialMatches.map((album: any) => album.title);
              const bestMatch = stringSimilarity.findBestMatch(
                track.album,
                titles
              ).bestMatch;

              if (bestMatch.rating > 0.3) {
                // Adjust the threshold as needed
                const albumDetails = potentialMatches.find(
                  (album: any) => album.title === bestMatch.target
                );
                console.log(albumDetails);
                if (albumDetails) {
                  track.tags = albumDetails.tags;
                  track.releaseYear = albumDetails["first-release-date"];
                }
              }
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
