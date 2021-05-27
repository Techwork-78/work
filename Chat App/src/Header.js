import React from "react";
import "./Header.css";
import LA from "./logo.png";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { ButtonBase } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import AVA from "./avatar.png";

function Header() {
  const [{ name, img, dark }, dispatch] = useStateValue();

  const footer = () => {
    dispatch({
      type: "FOOTER",
      footer: false,
    });
  };

  const mode = () => {
    if (dark === true) {
      dispatch({
        type: "DARK",
        dark: false,
      });
    } else {
      dispatch({
        type: "DARK",
        dark: true,
      });
    }
  };

  return (
    <div className={`header ${!dark && "light"}`}>
      <img className="logo" src={LA} alt="" />
      <div className="h-navs">
        {dark ? (
          <BrightnessLowIcon
            className={!dark && "skyblue"}
            onClick={mode}
            fontSize="large"
          />
        ) : (
          <Brightness4Icon
            className={!dark && "skyblue"}
            onClick={mode}
            fontSize="large"
          />
        )}
        <ButtonBase>
          <Link to="/profile" onClick={footer}>
            {img ? (
              <img className={!dark && "sky"} src={img} alt={name} />
            ) : (
              <img className={!dark && "sky"} src={AVA} alt="PROFILE" />
            )}
          </Link>
        </ButtonBase>
      </div>
    </div>
  );
}

export default Header;
