import React from "react";
import style from "./Donate.module.css";
import { FormSVG } from "../SVG/index";

const Donate = ({ setDonate, setSupport, donateAmount, setLoading }) => {
  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form className={style.form}>
          <p className={style.heading}>Suport The Creator</p>
          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="number"
              placeholder="Amount 0.025"
              autoCapitalize="off"
              min={0.025}
              onChange={(e) => setSupport(e.target.value)}
              className={style.input_field}
            />
          </div>
          <div className={style.btn}>
            <button className={style.button1} onClick={() => setDonate(false)}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Close
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className={style.button2}>Sign Up</button>
          </div>
          <button
            className={style.button3}
            onClick={() => setLoading(true, donateAmount(), setDonate(false))}
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
