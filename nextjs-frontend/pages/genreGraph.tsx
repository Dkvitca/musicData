import React from "react";
import { usePlaylist } from "../contexts/PlaylistContext";
import GenreChart from "../components/GenreChart";

const GenreGraphPage: React.FC = () => {
  const { selectedPlaylist } = usePlaylist();

  if (!selectedPlaylist) {
    return <div>No playlist selected</div>;
  }

  const genres: { [key: string]: number } = {};

  selectedPlaylist.tracks.forEach((track) => {
    track.tags?.forEach((tag) => {
      if (genres[tag.name]) {
        genres[tag.name] += tag.count;
      } else {
        genres[tag.name] = tag.count;
      }
    });
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-800 p-4 overflow-y-scroll">
        <h2 className="text-2xl font-semibold text-white mb-4">Tracks</h2>
        <ul className="space-y-4">
          {selectedPlaylist.tracks.map((track, index) => (
            <li key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white">{track.name}</h3>
              <p className="text-sm text-gray-300">{track.artist}</p>
              <p className="text-sm text-gray-400">{track.album}</p>
              <p className="text-sm text-gray-400">
                Released: {track.releaseYear || "Unknown"}
              </p>
              <div className="text-sm text-gray-400">
                Tags:{" "}
                {track.tags && track.tags.length > 0
                  ? track.tags.map((tag) => tag.name).join(", ")
                  : "None"}
              </div>
              <a
                href={track.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2 inline-block"
              >
                Listen
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-dark-gradient p-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Genre Graph</h2>
        <GenreChart genres={genres} />
      </div>
    </div>
  );
};

export default GenreGraphPage;
