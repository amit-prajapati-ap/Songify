import { PlayerContext } from "@/context/PlayerContext"
import { useContext, useEffect, useState } from "react"

const FullScreenPlayer = ({disableFullScreen, fullScreen}) => {
  const {seekBar, seekBg, playerStatus, play, pause, track, time, next, prev, seekSong, favorites, addFavorite, removeFavorite, repeat} = useContext(PlayerContext)
  const [favorite, setFavorite] = useState('')

  const toggleFavorite = () => {
    console.log(favorite)
    if (favorite.toString()) {
      removeFavorite(favorite)
    } else {
      addFavorite(track.id)
    }
  }

  useEffect(() => {
    setFavorite(favorites.includes(track.id) ? track.id : '')
  }, [favorites, track.id])

  useEffect(() => {
    console.log("hello")
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50">
      Hello
    </div>
  )
}

export default FullScreenPlayer
