import Link from "next/link";
import React from "react";
import style from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={style.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Logo;
