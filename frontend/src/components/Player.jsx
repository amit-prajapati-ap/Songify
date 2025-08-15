import { useContext } from "react"
import { assets } from "../assets/frontend-assets/assets"
import { PlayerContext } from "../context/PlayerContext"

const Player = () => {
  const {seekBar, seekBg, playerStatus, play, pause, track, time, next, prev, seekSong} = useContext(PlayerContext)
  return (
    <div className="h-[10%] bg-gray-950 flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="" className="w-12" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img src={assets.shuffle_icon} alt="" className="w-4 cursor-pointer" />
          <img onClick={prev} src={assets.prev_icon} alt="" className="w-4 cursor-pointer" />

          {playerStatus ? (
            <img onClick={pause} src={assets.pause_icon} alt="" className="w-4 cursor-pointer" />
          ) : (
            <img onClick={play} src={assets.play_icon} alt="" className="w-4 cursor-pointer" />
          )}

          <img onClick={next} src={assets.next_icon} alt="" className="w-4 cursor-pointer" />
          <img src={assets.loop_icon} alt="" className="w-4 cursor-pointer" />
        </div>
        <div className={`flex items-center gap-5 ${time.totalTime.seconds === 0 && time.totalTime.minutes === 0 && "hidden"}`}>
          <p>0{time.currentTime.minutes} : {time.currentTime.seconds < 10 ? "0" : ""}{time.currentTime.seconds}</p>
          <div onClick={seekSong} ref={seekBg} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBar} className="h-1 border-none w-10 bg-cyan-500 rounded-full"/>
          </div>
          <p>
            {String(isNaN(time?.totalTime?.minutes) ? 0 : time.totalTime.minutes).padStart(2, "0")} :
            {String(isNaN(time?.totalTime?.seconds) ? 0 : time.totalTime.seconds).padStart(2, "0")}
          </p>

        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75 hover:opacity-100 transition-all duration-300">
        <img src={assets.zoom_icon} className="w-4 cursor-pointer" alt="" />
      </div>
    </div>
  )
}

export default Player