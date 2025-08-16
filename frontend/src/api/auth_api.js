import axios from "axios";

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