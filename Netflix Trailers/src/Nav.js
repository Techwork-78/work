import React, { useState, useEffect } from "react";
import "./Nav.css";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function Nav() {
  const [show, handleShow] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const signout = () => {
    if (user)
      auth.signOut().then(
        dispatch({
          type: "SET_USER",
          user: null,
        })
      );
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
        alt="NETFLIX LOGO"
      />
      <diV>
        <img
          className="nav_avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="NETFLIX LOGO"
          onClick={signout}
        />
        <p style={{ color: "white", fontSize: "8.3px", marginTop: "0" }}>
          Sign Out
        </p>
      </diV>
    </div>
  );
}

export default Nav;
