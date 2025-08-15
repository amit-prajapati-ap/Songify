import { useParams } from "react-router-dom";
import {
  albumsData,
  assets,
  songsData,
} from "../assets/frontend-assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  return (
    <>
      <div className="flex mt-10 gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1 flex gap-2 items-center max-[420px]:flex-col max-[420px]:items-start">
            <div className="flex items-center gap-2">
              <img
                className="inline-block w-5"
                src={assets.spotify_logo}
                alt=""
              />
              <b>Songify</b>- <b>50 songs</b>
            </div>
            <p className="mt-[1px]">about 2 hr 20 min</p>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-10 mb-4 pl-2 text-gray-shade-1">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p className="hidden sm:block">Album</p>
        <p className="hidden md:block">Date Added</p>
        <img src={assets.clock_icon} className="m-auto w-4" alt="" />
      </div>
      <hr />
      {songsData.map((song, index) => (
        <div
          onClick={() => playWithId(song.id)}
          key={index}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 items-center hover:bg-dark-shade-2 cursor-pointer text-gray-shade-1"
        >
          <p className="text-white flex items-center">
            <b className="mr-4 text-gray-shade-1">{index + 1}</b>
            <img
              src={song.image}
              className="inline w-10 mr-5 max-[440px]:hidden"
              alt=""
            />
            <p className="line-clamp-1">{song.name}</p>
          </p>
          <p className="text-[15px] hidden sm:block">{song.name}</p>
          <p className="text-[15px] hidden md:block">5 days ago</p>
          <p className="text-[15px] text-center">{song.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
