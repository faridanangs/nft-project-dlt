import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Login, Logo, SignUp } from "../index";
import Link from "next/link";

const Header = ({ notification, setNotification }) => {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "#",
    },
    {
      name: "Api",
      link: "/nfts-api",
    },
  ];
  const [signup, setSignup] = useState(false);
  const [login, setlogin] = useState(false);
  const [token, setToken] = useState("");

  const openModel = (el) => {
    if (el == "Login") {
      setlogin(true);
      setSignup(false);
    } else if (el == "SignUp") {
      setSignup(true);
      setlogin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("NFTApi Token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi Token");
    window.location.reload();
  };
  return (
    <>
      <div className={style.Header}>
        <Logo />
        <div className={style.menu}>
          {menuList.map((item, index) => (
            <Link href={item.link} key={index} className={style.link}>
              <p>{item.name}</p>
            </Link>
          ))}
          {token ? (
            <p onClick={() => logout()}>Logout</p>
          ) : (
            <>
              <p onClick={() => openModel("Login")}>Login</p>
              <p onClick={() => openModel("SignUp")}>SignUp</p>
            </>
          )}
        </div>
      </div>

      {/* signup */}
      {signup && (
        <div className={style.form}>
          <div className={style.form_inner}>
            <SignUp
              setLogin={setlogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {/* login */}
      {login && (
        <div className={style.form}>
          <div className={style.form_inner}>
            <Login
              setLogin={setlogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
