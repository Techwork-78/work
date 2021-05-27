import { Link } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Post.css";
import { useStateValue } from "./StateProvider";

function Post({ name, img, bio, email, photo, caption, time, right }) {
  const [{ dark }, dispatch] = useStateValue();
  const history = useHistory();
  const [zoom, setZoom] = useState(false);

  const profri = () => {
    history.push("/view");
    dispatch({
      type: "PROFRI",
      profri: {
        name: name,
        img: img,
        bio: bio,
        email: email,
      },
    });
    dispatch({
      type: "FOOTER",
      footer: false,
    });
  };

  const fullScreen = () => {
    if (!zoom) {
      setZoom(true);
    } else {
      setZoom(false);
    }
  };

  return (
    <div className={`post ${right && "right"}`}>
      <div className="po-head">
        <Link to="/view" onClick={profri}>
          <img className={!dark && "sky"} src={img} alt="" />
        </Link>
      </div>
      <div className={`po-main ${!dark && "light black"}`}>
        <p className={`po-user ${!dark && "skyblue"}`}>{name}</p>
        {photo && (
          <a>
            <img
              onClick={fullScreen}
              id="img"
              className={`p-img ${zoom && "zoom"}`}
              src={photo}
              alt=""
            />
          </a>
        )}
        <p className="po-cap">{caption}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
}

export default Post;
