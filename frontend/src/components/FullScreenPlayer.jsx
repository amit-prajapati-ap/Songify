import { assets } from "@/assets/frontend-assets/assets";
import { ChevronLeft, Heart, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const FullScreenPlayer = ({
  track,
  favorites,
  addFavorite,
  removeFavorite,
  favorite,
  setFavorite,
  pause,
  play,
  playerStatus,
  seekSong,
  seekBar,
  seekBg,
  time,
  next,
  prev,
  repeat,
  disableFullScreen,
  seekBarFullScreen,
  progress
}) => {
  const [toggleToLyrics, setToggleToLyrics] = useState(false);

  const toggleFavorite = () => {
    console.log(favorite);
    if (favorite.toString()) {
      removeFavorite(favorite);
    } else {
      addFavorite(track.id);
    }
  };

  useEffect(() => {
    setFavorite(favorites.includes(track.id) ? track.id : "");
  }, [favorites, track.id]);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-tl from-[#1a002c] via-[#2a003f] to-[#a0006d] z-50">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 p-4">
        <div className="flex items-center gap-4 justify-between">
          <ChevronLeft
            onClick={disableFullScreen}
            className="cursor-pointer"
            size={32}
          />
          <p className="text-2xl font-semibold">Now Playing</p>
          <MoreHorizontalIcon className="cursor-pointer" size={32} />
        </div>
        <div className="flex items-center gap-4 justify-center">
          {!toggleToLyrics && (
            <img
              onClick={() => setToggleToLyrics(true)}
              src={track.image}
              alt=""
              className="w-60 h-60 object-cover rounded-md transition duration-300 hover:brightness-70 cursor-pointer"
            />
          )}

          {toggleToLyrics && (
            <p
              onClick={() => setToggleToLyrics(false)}
              className="h-60 border w-120 rounded-md px-3 py-1 cursor-pointer font-semibold overflow-y-auto"
            >
              {track?.lyrics ? track.lyrics : "No Lyrics Found"}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-0.5 items-center justify-center">
            <h1 className="font-bold text-2xl">{track.name}</h1>
            <h2 className="text-pink-500 font-semibold text-center">{track.desc}</h2>
          </div>
          
        </div>
        <div className="my-10 sm:px-10">
          <div
            className={`flex items-center mx-auto justify-center relative gap-5`}
          >
            <Heart
              size={30}
              className={`cursor-pointer absolute -top-8 ${
                favorite.toString() && "fill-cyan-500 text-transparent"
              }`}
              onClick={toggleFavorite}
            />
            <p className="absolute left-0 -top-6">
              0{time.currentTime.minutes} :{" "}
              {time.currentTime.seconds < 10 ? "0" : ""}
              {time.currentTime.seconds}
            </p>
            <div
              onClick={seekSong}
              ref={seekBg}
              className="w-full mt-2 bg-gray-300 rounded-full cursor-pointer"
            >
              <hr
                ref={seekBarFullScreen}
                style={{ width: `${progress}%` }}
                className="h-1 border-none bg-cyan-500 rounded-full"
              />
            </div>
            <p className="absolute right-0 -top-6">
              {String(
                isNaN(time?.totalTime?.minutes) ? 0 : time.totalTime.minutes
              ).padStart(2, "0")}{" "}
              :
              {String(
                isNaN(time?.totalTime?.seconds) ? 0 : time.totalTime.seconds
              ).padStart(2, "0")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <img
            src={assets.shuffle_icon}
            alt=""
            className="w-6 cursor-pointer"
          />
          <img
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            src={assets.prev_icon}
            alt=""
            className="w-7 cursor-pointer"
          />

          {playerStatus ? (
            <img
              onClick={(e) => {
                e.stopPropagation();
                pause();
              }}
              src={assets.pause_icon}
              alt=""
              className="w-10 cursor-pointer"
            />
          ) : (
            <img
              onClick={(e) => {
                e.stopPropagation();
                play();
              }}
              src={assets.play_icon}
              alt=""
              className="w-10 cursor-pointer"
            />
          )}

          <img
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            src={assets.next_icon}
            alt=""
            className="w-7 cursor-pointer"
          />
            
          <img
            onClick={() => repeat(track.id)}
            src={assets.loop_icon}
            alt=""
            className="w-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
