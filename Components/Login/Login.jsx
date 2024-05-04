import React, { useState } from "react";
import style from "./Login.module.css";
import { FormSVG, Lock } from "../SVG";
import axios from "axios";
import { Notification } from "../index";

const Login = ({setLogin, setSignup, notification, setNotification}) => {
  // api login
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFileChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      return setNotification("Please enter your email and password");
    }

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/login",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });

      if (response.data.status == "success") {
        setNotification("You have successfully logged in");
        localStorage.setItem("NFTApi Token", response.data.token);
        setLogin(false);
        setNotification("");
        window.location.reload();
      } else if (response.data.status == "fail") {
        setNotification(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.card2}>
          <form className={style.form}>
            <p id="heading" className={style.heading}>
              Login
            </p>
            <div className={style.field}>
              <FormSVG styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("email", e)}
              />
            </div>
            <div className={style.field}>
              <Lock styleClass={style.input_icon} />
              <input
                type="password"
                className={style.input_field}
                placeholder="password"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("password", e)}
              />
            </div>
            <div className={style.btn}>
              <button className={style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                className={style.button2}
                onClick={() => (setSignup(true), setLogin(false))}
              >
                Sign Up
              </button>
            </div>
            <button className={style.button3} onClick={(e) => apiLogin(e)}>
              Login
            </button>
          </form>
        </div>
      </div>
      
      {/* // Notification */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Login;
