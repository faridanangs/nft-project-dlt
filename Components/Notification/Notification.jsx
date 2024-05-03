import React from "react";
import style from "./Notification.module.css";
import { IoIosNotifications } from "react-icons/io";

const Notification = ({ setNotofication, notification }) => {
  return (
    <div onClick={() => setNotofication("")} className={style.alert}>
      {notification}
      <span>&times;</span>
    </div>
  );
};

export default Notification;
