import { toastOptions } from "@/constants";
import axios from "axios";
import { toast } from "react-toastify";

export const login = ({username, password}) => {
  try {
    const {data} = axios.post("/api/auth/login", {username, password})

    if (data.success) {
      console.log("Login Success");
    } else {
      console.log(data.message);
    }
  } catch (error) {
    const {data} = error.response
    console.log(data.message)
  }
};

export const signUp = ({username, password, name, confirmPassword}) => {
  try {
    const {data} = axios.post("/api/auth/signup", {username, password, name, confirmPassword})

    if (data.success) {
      console.log("Register Success");
    } else {
      console.log(data.message);
    }
  } catch (error) {
    const {data} = error.response
    console.log(data.message)
  }
};

export const getUser = ({token}) => {
  try {
    const {data} = axios.get(`/api/auth/user?token=${token}`,)

    if (data.success) {
      console.log("User fetched");
    } else {
      console.log(data.message);
    }
  } catch (error) {
    const {data} = error.response
    console.log(data.message)
  }
};

export const logout = ({token}) => {
  try {
    const {data} = axios.get(`/api/auth/logout?token=${token}`,)

    if (data.success) {
      console.log("Logout Success");
    } else {
      console.log(data.message);
    }
  } catch (error) {
    const {data} = error.response
    console.log(data.message)
  }
};

export const loginWithLocalStorage = ({username, password}) => {
  if (!username && !password) {
    toast.error("Please fill all the fields", toastOptions);
    return
  } else {
    const existingUser = localStorage.getItem("songifyUser");
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.username === username && user.password === password) {
        user.login = true;
        localStorage.setItem("songifyUser", JSON.stringify(user));
        window.location.href = "/";
      } else {
        toast.error("Invalid username or password", toastOptions);
        return null
      }
    } else {
      toast.error("User not found", toastOptions);
      return null
    }
  }
};

export const signUpWithLocalStorage = ({username, password, name, confirmPassword}) => {
  if (!username && !password && !name && !confirmPassword) {
    toast.error("Please fill all the fields", toastOptions);
    return
  } else if (!username.includes("@")) {
    toast.error("Username should starts with @", toastOptions);
    return
  } else if (password !== confirmPassword) {
    toast.error("Passwords do not match", toastOptions);
    return    
  } else {
    const user = {username, password, name, confirmPassword, login: true};
    localStorage.setItem("songifyUser", JSON.stringify(user));
    window.location.href = "/";
  }
};

export const getUserWithLocalStorage = async () => {
  const user = localStorage.getItem("songifyUser");
  const parsedUser = JSON.parse(user);
  if (parsedUser && parsedUser.login) {
    return parsedUser;
  } else {
    return null;
  }
};

export const logoutWithLocalStorage = () => {
  const user = localStorage.getItem("songifyUser");
  if (user) {
    const parsedUser = JSON.parse(user);
    parsedUser.login = false;
    localStorage.setItem("songifyUser", JSON.stringify(parsedUser));
    toast.success("Logged out successfully", toastOptions);
    return true
  } else {
    toast.error("You are not logged in", toastOptions);
    return false;
  }
};