import React from "react";
import Tilt from "react-tilt"; // or import from "react-parallax-tilt" if you prefer

function BillboardTilt({ songs, title }) {
  return (
    <Tilt className="w-full" options={{ max: 25, scale: 1.05 }}>
      <div className="p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <ul className="text-sm space-y-1">
          {songs.map((song, index) => (
            <li key={index}>
              {song.rank}. {song.title} - {song.artist} (
              {song.weeks} wk{song.weeks !== 1 ? "s" : ""})
            </li>
          ))}
        </ul>
      </div>
    </Tilt>
  );
}

export default BillboardTilt;
