import { albumsData, songsData } from "../assets/frontend-assets/assets";
import { AlbumItem, SongItem } from "./index";

const DisplayHome = () => {
  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((album, index) => (
            <AlbumItem key={index} {...album} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((song, index) => (
            <SongItem key={index} {...song} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
