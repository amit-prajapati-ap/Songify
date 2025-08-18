import { useEffect, useRef } from 'react'
import { DisplayHome, DisplayAlbum, Music, Playlist, Navbar, Favorite } from '../components/index'
import {Routes, Route, useLocation} from 'react-router-dom'
import { albumsData } from '@/assets/frontend-assets/assets'

const Display = () => {
  const displayRef = useRef()
  const location = useLocation()
  const isAlbum = location.pathname.includes('album')
  const albumId = isAlbum ? location.pathname.split('/album/')[1] : ''
  const  bgColor = albumsData[Number(albumId)].bgColor

  useEffect(() => {
    if (isAlbum) {
      console.log(isAlbum, bgColor)
      displayRef.current.style.backgroundImage = `linear-gradient(to bottom, ${bgColor} 0%, #121212 100%)`
    } else {
      displayRef.current.style.backgroundColor = '#121212'
    }

    return () => {
      displayRef.current.style.backgroundImage = ''
    }
  }, [albumId, isAlbum])
  
  return (
    <div ref={displayRef} className="w-full m-2 sm:px-6 p-2 pt-4 rounded bg-dark-shade-1 text-white overflow-auto lg:ml-0">
      <Navbar/>
      <Routes>
        <Route path="/" element={<DisplayHome />}></Route>
        <Route path="/album/:id" element={<DisplayAlbum />}></Route>
        <Route path="/music" element={<Music />}></Route>
        <Route path="/playlist" element={<Playlist />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </div>
  )
}

export default Display
