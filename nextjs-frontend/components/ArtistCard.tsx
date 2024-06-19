import React from "react";

interface Artist {
  _id: string;
  sortName: string;
  country: string;
  gender: string;
  lifeSpan: {
    begin: string;
    end: string | null;
  };
  genres: string[];
  tags: { name: string; count: number }[];
}

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="artist-card">
      <h3>{artist.sortName}</h3>
      <p>{artist.country}</p>
      <p>{artist.gender}</p>
      <p>
        {artist.lifeSpan.begin} - {artist.lifeSpan.end || "Present"}
      </p>
      <p>Genres: {artist.genres.join(", ")}</p>
      <p>Tags: {artist.tags.map((tag) => tag.name).join(", ")}</p>
    </div>
  );
};

export default ArtistCard;
