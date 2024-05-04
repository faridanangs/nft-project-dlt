import React from "react";
import style from "./Upload.module.css";
import Image from "next/image";
import { Delete, UploadIcon, File } from "../SVG/index";

const Upload = ({ onImageChange, display, retrieveFile }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            <p>Browse File to Uopload</p>
          </>
        ) : (
          <p>
            <Image
              className={style.image}
              src={display}
              alt="Image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>
      <label htmlFor="file" className={style.footer}>
        <File />
        <p>Not Selected File</p>
        <Delete />
      </label>
      <input
        type="file"
        id="file"
        onChange={(e) => (onImageChange(e), retrieveFile(e))}
        className={style.file}
      />
    </div>
  );
};

export default Upload;
