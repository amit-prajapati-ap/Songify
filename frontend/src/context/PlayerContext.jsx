import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      minutes: 0,
      seconds: 0,
    },
    totalTime: {
      minutes: 0,
      seconds: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayerStatus(true);
  }
  
  const prev = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }
  
  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / e.target.offsetWidth) * audioRef.current.duration).toFixed(2);
  }
  
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {

        seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
        setTime({
          currentTime: {
            minutes: Math.floor(audioRef.current.currentTime/60),
            seconds: Math.floor(audioRef.current.currentTime%60),
          },
          totalTime: {
            minutes: Math.floor(audioRef.current.duration/60),
            seconds: Math.floor(audioRef.current.duration%60),
          },
        });
        if (audioRef.current.currentTime === audioRef.current.duration) {
          setPlayerStatus(false);
        }
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    prev,
    next,
    seekSong
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
