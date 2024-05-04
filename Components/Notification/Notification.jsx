import React from "react";
import style from "./Notification.module.css";
import { IoIosNotifications } from "react-icons/io";

const Notification = ({ setNotification, notification }) => {
  return (
    <div onClick={() => setNotification("")} className={style.alert}>
      {notification}
      <span>&times;</span>
    </div>
  );
};

export default Notification;
