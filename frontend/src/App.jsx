import { useContext } from 'react'
import { Player, Sidebar } from './components'
import {Display} from './pages'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const {audioRef, track} = useContext(PlayerContext)
  return (
    <div className='h-screen bg-gray-950'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display/>
      </div>
      <Player/>
      <audio src={track.file} ref={audioRef} preload='auto'></audio>
    </div>
  )
}

export default App
