import React, { useState } from "react";
import "./Footer.css";
import AVA from "./avatar.png";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SendIcon from "@material-ui/icons/Send";
import { useStateValue } from "./StateProvider";
import { auth, db, storage } from "./firebase";
import firebase from "firebase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";

const date = new Date().getDay().toString();

function Footer() {
  const [mes, setMes] = useState("");
  const [photo, setPhoto] = useState(null);
  const [{ user, bio, footer, dark, name, img }, dispatch] = useStateValue();
  const [uname, setName] = useState("");
  const [ubio, setBio] = useState("");
  const [time, setTime] = useState("");
  const history = useHistory();

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  const upload = () => {
    if (mes === "" && photo === null) {
      console.log("no......");
    } else if (photo === null) {
      db.collection("posts")
        .add({
          mes: mes,
          username: name || uname,
          bio: bio || ubio,
          email: user?.email,
          userImg: img || AVA,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          curTime: time,
        })
        .then(setMes(""));
    } else {
      const up = storage
        .ref(`/posts/${user.email}/${date}}${photo.name}`)
        .put(photo);
      up.on("state_changed", (snap) => {
        storage
          .ref(`/posts/${user.email}/${date}}${photo.name}`)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                photo: url,
                mes: mes,
                username: name || uname,
                bio: bio || ubio,
                email: user?.email,
                userImg: img || AVA,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                curTime: time,
              })
              .then(() => {
                db.collection("users")
                  .doc(user.email)
                  .collection("posts")
                  .add({
                    photo: url,
                    username: name || uname,
                    bio: bio || ubio,
                    email: user?.email,
                    userImg: img || AVA,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    curTime: time,
                  });
              });
          })
          .then(() => {
            setMes("");
            setPhoto(null);
          });
      });
    }
  };

  const signout = () => {
    auth.signOut().then(history.push("/"));
  };

  const foot = () => {
    dispatch({
      type: "FOOTER",
      footer: true,
    });
  };

  return footer ? (
    <div className={`footer ${!dark && "light"}`}>
      <div className="f-cont">
        <div className={`f-msg ${!dark && "sky"}`}>
          <input
            className={`f-inp ${!dark && "skyblue"}`}
            type="text"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            placeholder="Type a message"
          />
          <input
            className="f-inp2"
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <CameraAltIcon className={!dark && "skyblue"} fontSize="large" />
        </div>
        <div className="f-send">
          <SendIcon
            id="send"
            className={!dark && "skyblue"}
            fontSize="large"
            onClick={upload}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={`no-foot ${!dark && "light"}`}>
      <Link to="/" onClick={foot}>
        <HomeOutlinedIcon className={!dark && "skyblue"} fontSize="large" />
      </Link>
      <ExitToAppIcon
        className={!dark && "skyblue"}
        fontSize="large"
        onClick={signout}
      />
    </div>
  );
}

export default Footer;
