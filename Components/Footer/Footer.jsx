import React from "react";
import style from "./Footer.module.css";
import { Logo } from "../index";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = () => {
  const menuList = ["Home", "About", "Product", "Contact", "ICO", "Membership"];
  return (
    <div className={style.footer}>
      <div className={style.footer_box}>
        <div className={style.footer_box_social}>
          <a href="/">
            <Logo className={style.footer_box_social_logo} />
          </a>
          <p className={style.footer_box_social_info}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            aliquid. Libero repudiandae aliquam id alias ullam laudantium beatae
            odit, exercitationem fugit voluptatibus, totam est expedita aliquid
            fugiat optio, saepe quisquam.
          </p>
          <div className={style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>
        <div className={style.footer_box_help}>
          <h3>Help center</h3>
          <div className={style.menu}>
            {menuList.map((item, i) => (
              <p key={i + 1}>{item}</p>
            ))}
          </div>
        </div>

        <div className={style.subscribe}>
          <h3>Subscribe</h3>
          <div className={style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={style.subscribe_box_send} />
          </div>
          <div className={style.subscribe_box_info}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              reprehenderit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
