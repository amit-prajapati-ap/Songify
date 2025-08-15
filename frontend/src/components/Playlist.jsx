import { albumsData } from "../assets/frontend-assets/assets";
import AlbumItem from "./AlbumItem";

const Playlist = () => {
  return (
    <div className="mb-4">
      <h1 className="my-5 font-bold text-2xl">All Playlists</h1>
      <div className="grid grid-cols-1 min-[465px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {albumsData.map((album, index) => (
          <AlbumItem key={index} {...album} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
