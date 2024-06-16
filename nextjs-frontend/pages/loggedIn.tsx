import React, { useEffect, useState } from "react";
import axios from "axios";

interface Playlist {
  id: string;
  name: string;
  href: string;
  images: { url: string }[];
  tracks: Track[];
}

interface Track {
  name: string;
  artist: string;
  album: string;
  href: string;
  imageUrl: string; // Ensure the track has an imageUrl property
}

const LoggedIn = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expandedPlaylists, setExpandedPlaylists] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchPlaylistsWithTracks = async () => {
      try {
        const response = await axios.get("/api/playlists");
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists with tracks:", error);
      }
    };

    fetchPlaylistsWithTracks();
  }, []);

  const toggleTracks = (playlistId: string) => {
    setExpandedPlaylists((prevState) => ({
      ...prevState,
      [playlistId]: !prevState[playlistId],
    }));
  };

  return (
    <div className="bg-dark-gradient min-h-screen text-white">
      <header className="bg-gray-900 p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">
          Your Spotify Playlists
        </h1>
      </header>
      <main className="container mx-auto p-6">
        <ul className="space-y-6">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex items-center p-6">
                {playlist.images.length > 0 && (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-20 h-20 object-cover rounded-lg mr-6"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">{playlist.name}</h2>
                </div>
                <button
                  onClick={() => toggleTracks(playlist.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {expandedPlaylists[playlist.id]
                    ? "Hide Tracks"
                    : "Show Tracks"}
                </button>
              </div>
              {expandedPlaylists[playlist.id] && (
                <ul className="border-t border-gray-700">
                  {playlist.tracks.map((track: Track, index: number) => (
                    <li
                      key={index}
                      className="flex items-center p-4 bg-gray-900 hover:bg-gray-800 transition"
                    >
                      {track.imageUrl ? (
                        <img
                          src={track.imageUrl}
                          alt={track.name}
                          className="flex-shrink-0 w-16 h-16 object-cover rounded-lg mr-4"
                        />
                      ) : (
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-lg mr-4"></div>
                      )}
                      <div className="flex-1">
                        <div className="text-xl font-semibold">
                          {track.name}
                        </div>
                        <div className="text-sm text-gray-300">
                          {track.artist}
                        </div>
                        <div className="text-sm text-gray-400 italic">
                          {track.album}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default LoggedIn;
