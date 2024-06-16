import React from "react";

const Home: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "/auth/spotify";
  };

  return (
    <div>
      <h1>Login with Spotify</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;
