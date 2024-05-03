import React from "react";
import style from "./Profile.module.css";
import { FormSVG, GitHub, Instagram, Twitter, YouTube } from "../SVG";
import Image from "next/image";
import images from "../Image/client/index";

const Profile = ({ setOpenProfile, userBalance, address }) => {
  return (
    <>
      <div className={style.card}>
        <div className={style.img}>
          <Image
            src={images.client1}
            width={80}
            height={80}
            onClick={() => setOpenProfile(true)}
          />
        </div>
        <span>{address?.slice(0, 25)}</span>
        <p className={style.info}>
          {userBalance} Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Harum doloremque quaerat minus atque, non necessitatibus quidem
          quod consectetur sapiente id incidunt autem doloribus iusto molestias
          ipsum aspernatur accusantium soluta assumenda!
        </p>
        <div className={style.share}>
          <a href="#">
            <GitHub />
          </a>
          <a href="#">
            <Instagram />
          </a>
          <a href="#">
            <Twitter />
          </a>
          <a href="#">
            <YouTube />
          </a>
        </div>
        <button onClick={() => setOpenProfile(false)}>Close</button>
      </div>
    </>
  );
};

export default Profile;
