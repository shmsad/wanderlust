import React, { useState } from "react";
import authContext from "./authContext";
import { baseUrls } from "../../baseUrls";
import { errorEmitter, successEmitter } from "../../ToastEmitter";
import { useNavigate } from "react-router-dom";
function AuthState({ children }) {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );

  const signupFun = async (myobj, navigate) => {
    try {
      const response = await fetch(`${baseUrls}/api/v3.2/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myobj),
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        navigate("/login");
        successEmitter(data.message);
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      errorEmitter("something error");
    }
  };

  const loginFun = async (user, navigate, setLogin) => {
    try {
      const respose = await fetch(`${baseUrls}/api/v3.2/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await respose.json();
      console.log(data);
      if (data.success) {
        setLogin({
          email: "",
          password: "",
        });
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        setUser(data.user);
        navigate("/");
        successEmitter(data.message);
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      errorEmitter("something went wrong");
    }
  };

  const getUserFun = async () => {
    try {
      const response = await fetch(`${baseUrls}/api/v3.2/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ user, isLogin, setIsLogin, signupFun, loginFun, getUserFun }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;
