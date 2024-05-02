import React from "react";
import style from "./Button.module.css";

const Button = ({ connect, disconnect, address, file }) => {
  return (
    <>
      {address ? (
        <button className={style.button} onClick={() => disconnect()}>
          <span className={style.button_content}>
            {file ? "Upload" : "Disconnect"}
          </span>
        </button>
      ) : (
        <button className={style.button} onClick={() => connect()}>
          <span className={style.button_content}>Connect</span>
        </button>
      )}
    </>
  );
};

export default Button;
