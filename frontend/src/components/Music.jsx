import { useParams } from 'react-router-dom'
import { assets, songsData } from '../assets/frontend-assets/assets'
import { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'
const Music = () => {
  const {id} = useParams()
  const [songs, setSongs] = useState(songsData)
  const {playWithId} = useContext(PlayerContext)

  return (
    <>
      <div className='grid grid-cols-3 mt-10 mb-4 pl-2 text-gray-shade-1'>
        <p><b className='mr-4'>#</b>Title</p>
        <p className='justify-self-end max-[]'>Date Added</p>
        <img src={assets.clock_icon} className='m-auto w-4' alt="" />
      </div>
      <hr />
      {
        songs.map((song, index) => (
          <div onClick={() => playWithId(song.id)} key={index} className='grid grid-cols-3 gap-2 p-2 items-center hover:bg-dark-shade-2 cursor-pointer text-gray-shade-1 border-b border-zinc-700'>
            <p className='text-white flex items-center'>
              <b className='mr-4 text-gray-shade-1'>{index + 1}</b>
              <img src={song.image} className='w-10 mr-5 hidden sm:inline' alt="" />
              <p className='line-clamp-1'>{song.name}</p>
            </p>
            <p className='text-[15px] justify-self-end'>5 days ago</p>
            <p className='text-[15px] text-center'>{song.duration}</p>
          </div>
        ))
      }
    </>
  )
}

export default Music
