import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FullScreenMenu = ({
  disableFullScreen,
  setToggleToLyrics,
  toggleToLyrics,
}) => {
  const navigate = useNavigate();
  const [qualitySelection, setQualitySelection] = useState('low')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            "bg-transparent border-none hover:bg-transparent hover:text-white"
          }
        >
          <MoreHorizontalIcon className="cursor-pointer" size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-black text-white mr-8"
        align="start"
      >
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/");
              disableFullScreen();
            }}
          >
            Home
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/music");
              disableFullScreen();
            }}
          >
            Musics
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/playlist");
              disableFullScreen();
            }}
          >
            Playlists
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/favorite");
              disableFullScreen();
            }}
          >
            Favorites
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Select Music Quality</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={'bg-black text-white'}>
                <DropdownMenuItem onClick={() => setQualitySelection('low')}>Low {qualitySelection === 'low' && '(Default)'}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQualitySelection('medium')}>Medium {qualitySelection === 'medium' && <Check className="text-green-500" />}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQualitySelection('high')}>High {qualitySelection === 'high' && <Check className="text-green-500" />}</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Utilities</DropdownMenuLabel>
          <DropdownMenuItem>Download</DropdownMenuItem>

          <DropdownMenuItem onClick={() => setToggleToLyrics(!toggleToLyrics)}>
            {toggleToLyrics ? "Close Lyrics" : "View Lyrics"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Close</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FullScreenMenu;
