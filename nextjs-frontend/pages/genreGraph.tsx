// pages/genreGraph.tsx

import React from "react";
import { usePlaylist } from "../contexts/PlaylistContext";
import GenreChart from "../components/GenreChart";

const GenreGraph = () => {
  const { selectedPlaylist } = usePlaylist();

  if (!selectedPlaylist) {
    return <div>Loading...</div>;
  }

  const genreCount = selectedPlaylist.tracks.reduce((acc: any, track: any) => {
    track.genres?.forEach((genre: any) => {
      acc[genre.name] = (acc[genre.name] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">{selectedPlaylist.name}</h2>
        <ul className="space-y-4">
          {selectedPlaylist.tracks.map((track: any, index: number) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg flex items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{track.name}</h3>
                <p className="text-lg text-gray-300">{track.artist}</p>
                <p className="text-lg text-gray-400">{track.album}</p>
                <p className="text-lg text-gray-400">
                  Released: {track.releaseYear || "Unknown"}
                </p>
                <div className="text-sm text-gray-400">
                  Genres:{" "}
                  {track.genres && track.genres.length > 0
                    ? track.genres.map((genre: any) => genre.name).join(", ")
                    : "None"}
                </div>
                <div className="text-sm text-gray-400">
                  Tags:{" "}
                  {track.tags && track.tags.length > 0
                    ? track.tags.map((tag: any) => tag.name).join(", ")
                    : "None"}
                </div>
              </div>
              {track.imageUrl && (
                <img
                  src={track.imageUrl}
                  alt={track.name}
                  className="w-20 h-20 object-cover rounded-lg ml-4"
                />
              )}
              <a
                href={track.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ml-4"
              >
                Listen
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-2/3 p-4">
        <h2 className="text-3xl font-bold mb-4">Genre Graph</h2>
        <GenreChart genres={genreCount} />
      </main>
    </div>
  );
};

export default GenreGraph;
