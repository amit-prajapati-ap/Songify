import { useParams } from "react-router-dom";
import { assets, songsData } from "../assets/frontend-assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Favorite = () => {
  const [filteredfavorites, setFilteredfavorites] = useState([]);
  const { playWithId } = useContext(PlayerContext);
  const { favorites, removeFavorite, pause } = useContext(PlayerContext);

  const handleRemoveFavorite = (songId) => {
    removeFavorite(songId);
    pause();
  };

  useEffect(() => {
    let foundFavorites = favorites
      .map((id) => songsData.find((song) => song.id === id))
      .filter(Boolean); // remove undefined if an id doesn't exist

    console.log(foundFavorites);

    setFilteredfavorites(foundFavorites.reverse());
  }, [favorites, songsData]);
  return (
    <>
      <div className="grid grid-cols-4 mt-10 mb-4 pl-2 text-gray-shade-1">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p className="justify-self-end max-[500px]:hidden">Date Added</p>
        <img src={assets.clock_icon} className="m-auto w-4" alt="" />
        <p className="justify-self-end pr-1">Action</p>
      </div>
      <hr />
      {filteredfavorites.map((song, index) => (
        <div
          onClick={() => playWithId(song.id)}
          key={index}
          className="grid grid-cols-4 gap-2 p-2 items-center hover:bg-dark-shade-2 cursor-pointer text-gray-shade-1 border-b border-zinc-700"
        >
          <p className="text-white flex items-center">
            <b className="mr-4 text-gray-shade-1">{index + 1}</b>
            <img
              src={song.image}
              className="w-10 mr-5 hidden sm:inline"
              alt=""
            />
            <p className="line-clamp-1">{song.name}</p>
          </p>
          <p className="text-[15px] justify-self-end max-[500px]:hidden">
            5 days ago
          </p>
          <p className="text-[15px] text-center">{song.duration}</p>
          <div className="text-[15px] justify-self-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant="outline"
                  className={
                    "bg-transparent hover:text-white hover:bg-rose-600"
                  }
                >
                  <Trash className="w-6" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will remove your favorite
                    song.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRemoveFavorite(song.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </>
  );
};

export default Favorite;
