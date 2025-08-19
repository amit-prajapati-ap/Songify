import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { songsData } from "@/assets/frontend-assets/assets";
import { assets } from "@/assets/frontend-assets/assets";

const Sidebar = () => {
  const {
    logout,
    isLogin,
    user,
    playWithId,
    play,
    pause,
    playerStatus,
    recentSongs,
  } = useContext(PlayerContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [filteredRecents, setFilteredRecents] = useState([]);

  useEffect(() => {
    let foundRecents = recentSongs
      .map((id) => songsData.find((song) => song.id === id))
      .filter(Boolean); // remove undefined if an id doesn't exist

    setFilteredRecents(foundRecents.reverse());
  }, [recentSongs, songsData]);

  return (
    <>
      {isLogin && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={
                "cursor-pointer fixed right-5 top-5 sm:top-8 hover:bg-black hover:text-white"
              }
            >
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className={'max-[450px]:w-full'}>
            <SheetHeader className={'bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a]'}>
              <SheetTitle className={"text-2xl"}>{user.name}</SheetTitle>
              <SheetTitle className={"text-gray-300 text-lg leading-3"}>
                Username: {user.username}
              </SheetTitle>
            </SheetHeader>
            <h1 className="text-2xl text-gray-100 px-4">Recents</h1>
            <div className="grid flex-1 bg-slate-950 auto-rows-min gap-4 px-4 overflow-auto">
              {filteredRecents.map((song, index) => (
                <div
                  onClick={() => {
                    playWithId(song.id);
                    setCurrentSong(song);
                  }}
                  key={index}
                  className="flex items-center py-1 px-2 rounded-md gap-4 cursor-pointer hover:bg-gray-800 transition-all duration-300"
                 >
                  <img
                    className="w-12 h-12 rounded"
                    src={song.image}
                    alt={song.name}
                  />
                  <div className="flex flex-col max-w-[300px]">
                    <p className="line-clamp-1">{song.name}</p>
                    <p className="text-gray-400 text-sm line-clamp-2">{song.desc}</p>
                  </div>

                  <div className="ml-auto min-w-14 flex justify-end">
                    {currentSong?.id === song.id ? (
                      playerStatus ? (
                        // ✅ Pause when this song is active
                        <img
                          onClick={(e) => {
                            e.stopPropagation();
                            pause(e);
                          }}
                          src={assets.pause_icon}
                          alt="pause"
                          className="w-4 cursor-pointer"
                        />
                      ) : (
                        // ✅ Resume when this song is active but paused
                        <img
                          onClick={(e) => {
                            e.stopPropagation();
                            play(e);
                          }}
                          src={assets.play_icon}
                          alt="play"
                          className="w-4 cursor-pointer"
                        />
                      )
                    ) : (
                      // ✅ Start playing a different song
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          playWithId(song.id);
                          setCurrentSong(song);
                        }}
                        src={assets.play_icon}
                        alt="play"
                        className="w-4 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter>
              <hr />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={"bg-red-600 hover:text-white hover:bg-rose-600"}
                  >
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will logout your
                      account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Sidebar;
