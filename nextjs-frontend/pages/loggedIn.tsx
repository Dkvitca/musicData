import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
  imageUrl: string;
  tags?: { name: string; count: number }[];
  releaseYear?: string;
}

const LoggedIn = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expandedPlaylists, setExpandedPlaylists] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchPlaylistsWithTracks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/playlists",
          { withCredentials: true }
        );
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
      <header className="bg-gray-900 p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Spotify Playlists</h1>
        <nav>
          <Link href="/dbAlbums" legacyBehavior>
            <a className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              View Albums
            </a>
          </Link>
        </nav>
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
                        <h3 className="text-xl font-semibold">{track.name}</h3>
                        <p className="text-sm text-gray-300">{track.artist}</p>
                        <p className="text-sm text-gray-400">{track.album}</p>
                        {track.releaseYear && (
                          <p className="text-sm text-gray-400">
                            Released: {track.releaseYear}
                          </p>
                        )}
                        {track.tags && (
                          <div className="text-sm text-gray-400">
                            Tags: {track.tags.map((tag) => tag.name).join(", ")}
                          </div>
                        )}
                      </div>
                      <a
                        href={track.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
      </main>
    </div>
  );
};

export default LoggedIn;
