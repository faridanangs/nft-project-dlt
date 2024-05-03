import React from "react";
import style from "./Form.module.css";
import { FormSVG, Lock } from "../SVG";
import { CheckBox } from "../index";

const Form = ({
  setFile,
  setDisplay,
  handleFieldChange,
  handleSubmit,
  setCategory,
}) => {
  const categories = ["Artificial", "Animals", "Nature"];
  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form className={style.form}>
          <p id="heading" className={style.heading}>
            Upload Image Details
          </p>
          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="text"
              className={style.input_field}
              placeholder="title"
              autoComplete="off"
              onChange={(e) => handleFieldChange("title", e)}
            />
          </div>
          <div className={style.field}>
            <Lock styleClass={style.input_icon} />
            <textarea
              type="description"
              className={`${style.textarea} ${style.input_field}`}
              placeholder="description"
              onChange={(e) => handleFieldChange("description", e)}
            />
          </div>
          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="email"
              className={style.input_field}
              placeholder="email"
              onChange={(e) => handleFieldChange("email", e)}
            />
          </div>
          <p className={style.second}>category</p>
          <div className={style.category}>
            {categories.map((c, i) => (
              <CheckBox key={i} setCategory={setCategory} category={c} />
            ))}
          </div>
          <div className={style.btn}>
            <button
              className={style.button1}
              onClick={() => (setFile(null), setDisplay(null))}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className={style.button2}>Sign Up</button>
          </div>
          <button className={style.button3} onClick={(e) => handleSubmit(e)}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
