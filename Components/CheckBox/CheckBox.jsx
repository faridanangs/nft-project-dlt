import React from "react";
import style from "./CheckBox.module.css";

const CheckBox = ({ category, setCategory }) => {
  return (
    <label
      onClick={() => setCategory(category)}
      className={style.material_checkbox}
    >
      <input type="checkbox" />
      <span className={style.checkmark}></span>
      {category}
    </label>
  );
};

export default CheckBox;
