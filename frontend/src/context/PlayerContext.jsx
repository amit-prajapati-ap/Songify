import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const firstRender = useRef(true);
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [recentSongs, setRecentSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    _id: 1,
    name: "Amit",
    username: "@amit",
  });
  const token = localStorage.getItem("token") || "";

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const updateRecentSongs = (song) => {
    console.log(recentSongs);
    setRecentSongs([...recentSongs.filter((s) => s !== song), song]);
    localStorage.setItem("recentSongs", JSON.stringify([...recentSongs, song]));
  };

  const addFavorite = (songId) => {
    setFavorites([...favorites, songId]);
    localStorage.setItem("favorites", JSON.stringify([...favorites, songId]));
  };

  const removeFavorite = (songId) => {
    setFavorites(favorites.filter((song) => song !== songId));
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((song) => song !== songId))
    );
  };

  const fetchFavorites = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  };

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  const repeat = async () => {
    audioRef.current.currentTime = 0;
    play();
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    updateRecentSongs(id);
    setPlayerStatus(true);
  };

  const prev = () => {
    if (track.id > 0) {
      playWithId(track.id - 1);
    }
  };
  const next = () => {
    if (track.id < songsData.length - 1) {
      playWithId(track.id + 1);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime = (
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      audioRef.current.duration
    ).toFixed(2);
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        }%`;
        setTime({
          currentTime: {
            minutes: Math.floor(audioRef.current.currentTime / 60),
            seconds: Math.floor(audioRef.current.currentTime % 60),
          },
          totalTime: {
            minutes: Math.floor(audioRef.current.duration / 60),
            seconds: Math.floor(audioRef.current.duration % 60),
          },
        });
      };

      audioRef.current.onended = () => {
        setPlayerStatus(false);
      };
    }, 1000);

  }, [audioRef]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // ⛔ skip autoplay on initial load
    }

    if (track && audioRef.current) {
      audioRef.current.load();
      play();
    }
  }, [track]);

  useEffect(() => {
    const recentSongs = JSON.parse(localStorage.getItem("recentSongs")) || [];
    setRecentSongs(recentSongs);
    fetchFavorites();
  }, []);

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
    seekSong,
    isLogin,
    setIsLogin,
    user,
    setUser,
    token,
    login,
    logout,
    recentSongs,
    updateRecentSongs,
    favorites,
    addFavorite,
    removeFavorite,
    repeat,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
