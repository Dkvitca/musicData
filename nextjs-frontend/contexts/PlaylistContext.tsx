import React, { createContext, useState, useContext, ReactNode } from "react";

interface Playlist {
  id: string;
  name: string;
  href: string;
  images: Array<{ url: string }>;
  tracks: Array<{
    name: string;
    artist: string;
    album: string;
    href: string;
    imageUrl: string;
    tags?: { name: string; count: number }[];
    releaseYear?: string;
  }>;
}

interface PlaylistContextType {
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: (playlist: Playlist) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  return (
    <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};
