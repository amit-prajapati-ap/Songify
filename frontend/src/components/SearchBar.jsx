import { songsData } from "@/assets/frontend-assets/assets"
import { PlayerContext } from "@/context/PlayerContext"
import { Cross, X } from "lucide-react"
import { useContext, useState } from "react"

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const {playWithId} = useContext(PlayerContext)
  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2 w-full">
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="search" placeholder="Search Songify" className="w-full hover:outline-none border py-3 px-4 rounded-full font-medium placeholder:text-zinc-400 focus:outline-none max-sm:bg-zinc-800"/>
        { searchText && <div onClick={() => setSearchText('')} className="absolute right-0 top-0 bottom-0 flex items-center pr-4 cursor-pointer"><X className="text-zinc-400"/></div>}
      </div>
      <div className="absolute flex flex-col gap-2 bg-zinc-800 mt-5 max-h-128 overflow-auto w-full mx-auto left-0 right-0 rounded-lg z-50">
        {searchText && songsData.filter(song => song.name.toLowerCase().includes(searchText.toLowerCase())).map((song, index) => (
          <div onClick={() => {
            playWithId(song.id)
            setSearchText('')
          }} key={index} className='flex justify-between px-4 gap-2 p-2 items-center hover:bg-dark-shade-2 cursor-pointer text-gray-shade-1 border-b border-zinc-700'>
            <p className='text-white flex items-center'>
              <img src={song.image} className='w-10 mr-5 hidden sm:inline' alt="" />
              <div className="flex flex-col gap-1">
                <p className='line-clamp-1'>{song.name}</p>
                <p className="text-sm text-zinc-500">{song.desc}</p>
              </div>
            </p>
            <p className='text-[15px] text-center'>{song.duration}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
