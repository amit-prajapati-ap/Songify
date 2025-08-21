import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { Heart } from "lucide-react";
import { FullScreenPlayer } from ".";

const Player = () => {
  const {
    seekBar,
    seekBg,
    playerStatus,
    play,
    pause,
    track,
    time,
    next,
    prev,
    seekSong,
    favorites,
    addFavorite,
    removeFavorite,
    repeat,
    seekBarFullScreen,
    progress
  } = useContext(PlayerContext);
  const [favorite, setFavorite] = useState("");
  const [fullScreen, setFullScreen] = useState(false);

  const toggleFavorite = () => {
    console.log(favorite);
    if (favorite.toString()) {
      removeFavorite(favorite);
    } else {
      addFavorite(track.id);
    }
  };

  const enableFullScreen = () => {
    setFullScreen(true);
  };

  const disableFullScreen = () => {
    setFullScreen(false);
  };

  const smallScreenEnableFullScreen = () => {
    if (window.screen.width < 645) {
      setFullScreen(true);
    }
  };

  useEffect(() => {
    setFavorite(favorites.includes(track.id) ? track.id : "");
  }, [favorites, track.id]);

  return (
    <>
      <div
        onClick={smallScreenEnableFullScreen}
        className="fixed h-25 bottom-0 w-full bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] py-2"
      >
        <div className="w-full flex justify-between gap-4 items-center text-white px-4">
          <div className="items-center gap-4 flex w-[50%] sm:w-[150px]">
            <img
              src={track.image}
              alt=""
              className="w-12 max-sm:rounded-full"
            />
            <div>
              <p className="font-bold line-clamp-1">{track.name}</p>
              <p className="line-clamp-1">{track.desc.slice(0, 12)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex max-sm:justify-end flex-row gap-4">
              <img
                src={assets.shuffle_icon}
                alt=""
                className="w-4 max-sm:hidden cursor-pointer"
              />
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                src={assets.prev_icon}
                alt=""
                className="sm:w-4 w-6 cursor-pointer"
              />

              {playerStatus ? (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    pause();
                  }}
                  src={assets.pause_icon}
                  alt=""
                  className="sm:w-4 w-6 cursor-pointer"
                />
              ) : (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    play();
                  }}
                  src={assets.play_icon}
                  alt=""
                  className="sm:w-4 w-6 cursor-pointer"
                />
              )}

              <img
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                src={assets.next_icon}
                alt=""
                className="sm:w-4 cursor-pointer w-6"
              />
              <img
                onClick={() => repeat(track.id)}
                src={assets.loop_icon}
                alt=""
                className="w-4 cursor-pointer max-sm:hidden"
              />
              <p className="w-4 cursor-pointer max-sm:hidden">
                <Heart
                  size={18}
                  className={`${
                    favorite.toString() && "fill-cyan-500 text-transparent"
                  }`}
                  onClick={toggleFavorite}
                />
              </p>
            </div>
            <div
              className={`flex items-center max-sm:hidden relative gap-5 ${
                time.totalTime.seconds === 0 &&
                time.totalTime.minutes === 0 &&
                "hidden"
              }`}
            >
              <p className="absolute left-0 -top-6">
                0{time.currentTime.minutes} :{" "}
                {time.currentTime.seconds < 10 ? "0" : ""}
                {time.currentTime.seconds}
              </p>
              <div
                onClick={seekSong}
                ref={seekBg}
                className="w-[60vw] max-w-[500px] mt-2 bg-gray-300 rounded-full cursor-pointer"
              >
                <hr
                  ref={seekBar}
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

          <div
            onClick={enableFullScreen}
            className="flex max-sm:hidden items-center gap-2 opacity-75 hover:opacity-100 transition-all duration-300"
          >
            <img src={assets.zoom_icon} className="w-4 cursor-pointer" alt="" />
          </div>
        </div>

        <div className="relative">
          <p className="sm:absolute max-sm:left-5 left-1/2 sm:-translate-x-1/4 top-2 text-xs max-sm:text-center max-sm:pt-3">Made by ❤️ Amit Prajapati & Sandeep</p>
        </div>
      </div>

      {fullScreen && (
        <FullScreenPlayer
          fullScreen={fullScreen}
          disableFullScreen={disableFullScreen}
          track={track}
          time={time}
          playerStatus={playerStatus}
          play={play}
          pause={pause}
          next={next}
          prev={prev}
          seekSong={seekSong}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          repeat={repeat}
          favorite={favorite}
          setFavorite={setFavorite}
          seekBarFullScreen={seekBarFullScreen}
          progress={progress}
        />
      )}
    </>
  );
};

export default Player;
