import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayerContext } from "@/context/PlayerContext";
import { signUpWithLocalStorage } from "@/api/auth_api";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginOption, setIsLoginOption] = useState(true);
  const { login, isLogin } = useContext(PlayerContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginOption) {
      login({username, password});
    } else {
      signUpWithLocalStorage({username, password, name, confirmPassword});
    }
  };

  useEffect(() => {
    setIsLoginOption(true);
  }, []);

  return (
    <>
      {!isLogin && <Dialog>
        <form>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-black bg-white cursor-pointer"
              >
                Login
              </Button>
            </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isLoginOption ? "Login" : "Sign Up"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {isLoginOption
                  ? "Login to your account and access your playlists, recents, favorites and more."
                  : "Create an account to get benefit of creating playlists, adding favorites and much more."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {!isLoginOption && (
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    required
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    placeholder="Name"
                  />
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  id="username-1"
                  name="username"
                  placeholder="@username"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="pass">Password</Label>
                <Input
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  id="pass"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>

              {!isLoginOption && (
                <div className="grid gap-3">
                  <Label htmlFor="confpass">Confirm Password</Label>
                  <Input
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confpass"
                    name="password"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              )}

              <div>
                <p className="flex gap-1">
                  {isLoginOption
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    onClick={() => setIsLoginOption(!isLoginOption)}
                    className="underline text-blue-500 cursor-pointer"
                  >
                    {isLoginOption ? "Sign Up" : "Login"}
                  </span>
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className={"cursor-pointer transition-all duration-300"}
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleSubmit} className={"cursor-pointer"}>
                  {isLoginOption ? "Login" : "Register"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>}
    </>
  );
};

export default Profile;
