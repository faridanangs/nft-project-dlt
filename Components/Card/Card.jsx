import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import style from "./Card.module.css";
import images from "../Image/index";
import nftImage from "../Image/1.jpg"

const Card = ({ setNotification, image, index }) => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <a href={`/image/${image?.imageID}`}>
          <p>
            <Image
              className={style.image}
              // src={image?.image}
              src={nftImage}
              alt="Image"
              width={250}
              height={200}
            />
          </p>
        </a>
        <span className={style.para}>
          <Image
            className="avatar_img"
            // src={images[`client${index + 1}`]}
            src={nftImage}

            width={40}
            height={40}
          />
          <small
            className={style.para_small}
            onClick={
              (() => setNotification("Successfully copied")
              // navigator.clipboard.writeText(image?.owner)
            )
            }
          >
            {image?.owner.slice(0, 25)}...
          </small>
        </span>
        <span>
          CreatedAt: {new Date(image?.createdAt * 1000).toDateString()}
          <small className={style.number}>#{image?.imageID}</small>
        </span>
        <small className={style.para}>
          {image?.description.slice(0, 80)}...
        </small>
        <button
          onClick={
            (() => setNotification("Image url is successfully copied")
            // navigator.clipboard.writeText(image?.image)
          )
          }
          className={style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
