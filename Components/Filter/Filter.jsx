import React, { useEffect, useState } from "react";
import style from "./Filter.module.css";
import Image from "next/image";
import images from "../Image/index";

const Filter = ({
  activeSelect,
  setActiveSelect,
  setImagesCopy,
  imagesCopy,
  setAllImages,
  allImages,
  oldImages,
}) => {
  const [search, setsearch] = useState();
  const [toggle, settoggle] = useState();
  const [debouncedSearch, setdebouncedSearch] = useState();

  const onHandleSearch = (value) => {
    const filteredImages = allImages.filter(({ owner }) =>
      owner.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredImages.length === 0) {
      setAllImages(imagesCopy);
    } else {
      setAllImages(filteredImages);
    }
  };

  const onClearSearch = () => {
    if (allImages.length && imagesCopy.length) {
      setAllImages(imagesCopy);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => setsearch(debouncedSearch), 1000);
  //   return () => clearTimeout(timer);
  // }, [debouncedSearch]);

  // useEffect(() => {
  //   setImagesCopy(oldImages);
  //   setAllImages(oldImages);

  //   if (search) {
  //     onHandleSearch(search);
  //   } else {
  //     onClearSearch();
  //   }
  // }, [search]);

  const filters = [
    {
      name: "Old Images",
    },
    {
      name: "Recent Images",
    },
  ];

  // useEffect(() => {
  //   if (activeSelect === "Old Images") {
  //     setAllImages(oldImages);
  //   } else {
  //     setAllImages(oldImages.reverse());
  //   }
  // }, [activeSelect]);

  return (
    <div className={style.Filter}>
      <div className={style.Filter_box}>
        <Image src={images.search} width={20} height={20} />
        <input
          type="text"
          placeholder="Search address"
          onChange={(e) => setdebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        className={style.filter}
        onClick={() => (toggle ? settoggle(false) : settoggle(true))}
      >
        <div className={style.filter_title}>
          <h4>{activeSelect}</h4>
          <Image src={images.arrow} width={10} height={10} />
        </div>
        {toggle && (
          <div className={style.filter_box}>
            {filters.map((el, index) => (
              <p key={index + 1} onClick={() => setActiveSelect(el.name)}>
                {el.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
