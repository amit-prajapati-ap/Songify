import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";
import { getUserWithLocalStorage, loginWithLocalStorage, logoutWithLocalStorage } from "@/api/auth_api";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const seekBarFullScreen = useRef();
  const firstRender = useRef(true);
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [recentSongs, setRecentSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [progress, setProgress] = useState(0);
  const [songifyUser, setSongifyUser] = useState(null);
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
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    _id: 1,
    name: "Amit",
    username: "@amit",
  });
  const token = localStorage.getItem("token") || "";

  const login = ({username, password}) => {
    loginWithLocalStorage({username, password})
  }
  const logout = () => {
    const loguotSuccess = logoutWithLocalStorage()
    if (loguotSuccess) {
      setIsLogin(false)
    }
  };

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
    const audio = audioRef.current;
    if (!audio) return;

    audio.ontimeupdate = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
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

    audio.onended = () => {
      setPlayerStatus(false);
    };
  }, []);

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
    getUserWithLocalStorage().then((res) => {
      setSongifyUser(res)
      res && setIsLogin(true)
      setUser(res)
      fetchFavorites();
    });
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
    seekBarFullScreen,
    progress,
    songifyUser
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
