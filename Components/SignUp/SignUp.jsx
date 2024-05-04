import axios from "axios";
import React, { useState } from "react";
import { FormSVG, Lock } from "../SVG/index";
import { Notification } from "../index";
import style from "./SignUp.module.css";

const SignUp = ({ setLogin, setSignup, notification, setNotification }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormFileChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.password == "" ||
      user.name == "" ||
      user.confirmPassword == ""
    ) {
      return setNotification("Please provide all the detail");
    }
    setNotification("Wait creating new account ...");

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/signup",
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.confirmPassword,
        },
      });

      if (response.data.status == "success") {
        setNotification("You have successfully signed up");
        localStorage.setItem("NFTApi Token", response.data.token);
        setSignup(false);
        setNotification("");
        window.location.reload();
      } else {
        setNotification("Something went wrong, try again later");
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
              SignUp
            </p>
            <div className={style.field}>
              <FormSVG styleClass={style.input_iicon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="name"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("name", e)}
              />
            </div>
            <div className={style.field}>
              <FormSVG styleClass={style.input_iicon} />
              <input
                type="email"
                className={style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("email", e)}
              />
            </div>
            <div className={style.field}>
              <FormSVG styleClass={style.input_iicon} />
              <input
                type="password"
                className={style.input_field}
                placeholder="password"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("password", e)}
              />
            </div>
            <div className={style.field}>
              <FormSVG styleClass={style.input_iicon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Confirm Password"
                autoComplete="off"
                onChange={(e) => handleFormFileChange("confirmPassword", e)}
              />
            </div>
            <div className={style.btn}>
              <button
                className={style.button1}
                onClick={() => (setLogin(true), setSignup(false))}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                className={style.button2}
                onClick={() => setSignup(false)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <button className={style.button3} onClick={(e) => createAccount(e)}>
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Notification */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default SignUp;
