import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { Profile, SearchBar } from "@/components/index";
import { Search, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const isAlbum = location.pathname.includes("album");
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2 w-[15%]">
          <img
            onClick={() => navigate(-1)}
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt=""
          />
        </div>
        <div
          className={`flex justify-end w-[70%] mb-1 sm:hidden`}
        >
          {isSearching ? (
            <div onClick={() => setIsSearching(false)} className="flex items-center cursor-pointer"><X size={30} className="text-zinc-400"/></div>
          ) : (
            <Search onClick={() => setIsSearching(true)} />
          )}
        </div>
        {isSearching && (
          <div className="fixed left-0 right-0 px-4 top-18 z-50">
            <SearchBar />
          </div>
        )}
        <div className="hidden sm:w-[60%] sm:block">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2 w-[10%]">
          <Profile />
        </div>
      </div>
      {!isAlbum && (
        <div className="flex items-center gap-2 max-[390px]:gap-1 mt-4">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer"
                : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer"
            }
          >
            All
          </NavLink>
          <NavLink
            to={"/music"}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer"
                : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer"
            }
          >
            Music
          </NavLink>
          <NavLink
            to={"/playlist"}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer"
                : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer"
            }
          >
            Playlist
          </NavLink>
          <NavLink
            to={"/favorite"}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black text-sm px-4 py-1.5 rounded-2xl cursor-pointer"
                : "bg-black px-4 py-1.5 rounded-2xl cursor-pointer"
            }
          >
            Favorite
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
