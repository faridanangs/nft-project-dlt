import React, { useState } from "react";
import style from "./Product.module.css";
import { saveAs } from "file-saver";
import Image from "next/image";
import BTNStyle from "../Button/Button.module.css";
import images from "../Image/index";
import client from "../Image/client/index";
import { Donate } from "../index";
const Product = ({
  setNotification,
  setSupport,
  donateAmount,
  setLoading,
  image,
}) => {
  const handleClick = () => {
    let url = `${image?.imageURL}`;
    saveAs(url, `${image?.title}`);
  };
  const [donate, setDonate] = useState(false);

  return (
    <div className={style.Product}>
      <div className={style.image}>
        {/* <img className={style.image_img} src={image?.imageURL} alt="IMAGE" /> */}
        <Image className={style.image_img} src={images.img1} alt="image" width={200} height={200} />
      </div>
      <div className={style.detail}>
        <div className={style.detail_box}>
          <h1>{image?.title}</h1>
          <p>{image?.description}</p>
          <p className={style.info}>
            <span>Category: {image?.category}</span>{" "}
            <span>Image ID: {image?.imageId}</span>{" "}
            <span>
              CreatedAt: {new Date(image?.createdAt * 1000).toDateString()}
            </span>
          </p>
          <p className={style.info}>
            <span>Donation: {image?.fundRaised} MATIC</span>
          </p>
          <p>Contact Creator: {image?.email}</p>
          <span className={style.para}>
            <Image
              className={style.avatar_image}
              src={client[`client${1}`]}
              width={40}
              height={40}
              alt="avatar image"
            />
            <small
              className={style.para_small}
              onClick={() => {
                setNotification("Successfully copied");
                navigator.clipboard.writeText(image?.creator);
              }}
            >
              {image?.creator.slice(0, 30)}...
            </small>
          </span>
        </div>
        <button
          className={BTNStyle.button}
          onClick={() => {
            setNotification("Image URL is successfully copied");
            navigator.clipboard.writeText(image?.imageURL);
          }}
        >
          <span className={`${BTNStyle.button_content} ${style.btn}`}>
            Copy URL{" "}
          </span>
        </button>

        {/* {Download} */}
        <span className={style.space}></span>
        <button
          className={BTNStyle.button}
          onClick={() => {
            navigator.clipboard.writeText(
              setNotification("Thanks from downloading")
            );
          }}
        >
          <span
            className={`${BTNStyle.button_content} ${style.btn}`}
            onClick={handleClick}
          >
            Download Image{" "}
          </span>
        </button>

        {/* donate */}
        <span className={style.space}></span>
        <button
          className={BTNStyle.button}
          onClick={() => {
            setDonate(true);
          }}
        >
          <span className={`${BTNStyle.button_content} ${style.btn}`}>
            Donate
          </span>
        </button>
      </div>

      {donate && (
        <div className={style.form}>
          <div className={style.form_inner}>
            <Donate
              setDonate={setDonate}
              setLoading={setLoading}
              donateAmount={donateAmount}
              setSupport={setSupport}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
