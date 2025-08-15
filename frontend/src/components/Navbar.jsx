import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album')
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img onClick={() => navigate(-1)} src={assets.arrow_left} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" alt="" />
          <img onClick={() => navigate(1)} src={assets.arrow_right} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" alt="" />
        </div>
        <div className="flex items-center gap-2">
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">A</p>
        </div>

      </div>
      {!isAlbum && (
        <div className="flex items-center gap-2 mt-4">
          <NavLink to={'/'} className={({isActive}) => (isActive ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer" : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer")}>All</NavLink>
          <NavLink to={'/music'} className={({isActive}) => (isActive ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer" : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer")}>Music</NavLink>
          <NavLink to={'/playlist'} className={({isActive}) => (isActive ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer" : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer")}>Playlist</NavLink>
        </div>
      )}
    </>
  )
}

export default Navbar
