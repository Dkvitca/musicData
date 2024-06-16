import React, { useEffect, useState } from "react";
import axios from "axios";

const LoggedIn = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get("/api/playlists");
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const fetchTracks = async (playlistId: string) => {
    try {
      if (tracks[playlistId]) return; // If tracks are already fetched, do nothing

      const response = await axios.get(`/api/playlists/${playlistId}/tracks`);
      setTracks((prevTracks) => ({
        ...prevTracks,
        [playlistId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id} className="mb-4">
            <h2 className="text-xl font-semibold">{playlist.name}</h2>
            <a
              href={playlist.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Open in Spotify
            </a>
            <div>
              {playlist.images.length > 0 && (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-24 h-24"
                />
              )}
            </div>
            <button
              onClick={() => fetchTracks(playlist.id)}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Show Tracks
            </button>
            {tracks[playlist.id] && (
              <ul className="mt-2 border-t border-gray-300 pt-2">
                {tracks[playlist.id].map((track, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{track.name}</span> by{" "}
                    {track.artist} from the album{" "}
                    <span className="italic">{track.album}</span>{" "}
                    <a
                      href={track.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Listen
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoggedIn;
