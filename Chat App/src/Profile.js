import React, { useEffect, useState } from "react";
import "./Profile.css";
import { db, storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import EDIT from "./edit.png";
import AVA from "./avatar.png";
import CloseIcon from "@material-ui/icons/Close";

const date = new Date().getDay().toString();

function Profile() {
  const [edit, setEdit] = useState(false);
  const [{ user, name, bio, img, dark }, dispatch] = useStateValue();
  const [uname, setName] = useState("WELCOME");
  const [ubio, setBio] = useState("Tell something about you");
  const [imgData, setImgData] = useState([]);
  const history = useHistory();
  const [uimg, setImg] = useState(AVA);
  const [prog, setProg] = useState(0);
  console.log("Posts....", imgData);

  useEffect(() => {
    db.collection("users")
      .doc(user?.email)
      .collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setImgData(
          snap?.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setName(name);
    setBio(bio);
    setImg(img);
  }, [name, bio, img]);

  const prof = () => {
    db.collection("users")
      .doc(user?.email)
      .collection("profile")
      .add({
        name: uname,
        bio: ubio,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(
        dispatch({
          type: "FOOTER",
          footer: true,
        })
      )
      .then(history.push("/"));
  };

  const upload = () => {
    if (uimg === null) alert("No image has been selected");
    else {
      const up = storage
        .ref(`/users/${user.email}/${date}}${uimg.name}`)
        .put(uimg);
      up.on("state_changed", (snap) => {
        setProg((snap.bytesTransferred / snap.totalBytes) * 100);

        storage
          .ref(`/users/${user.email}/${date}}${uimg.name}`)
          .getDownloadURL()
          .then((url) => {
            db.collection("users").doc(user.email).collection("profImg").add({
              img: url,
              time: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      });
    }
  };

  return (
    <div className={edit ? "e-profile" : `profile ${!dark && "lightApp"}`}>
      <div className="p-head">
        {user && (
          <div>
            {edit ? (
              <CloseIcon
                onClick={() => {
                  edit === false ? setEdit(true) : setEdit(false);
                }}
                className="close"
                fontSize="large"
              />
            ) : (
              <img
                src={EDIT}
                alt="EDIT"
                className="edit"
                onClick={() => {
                  edit === false ? setEdit(true) : setEdit(false);
                }}
              />
            )}
          </div>
        )}
        {edit ? (
          <div className="e-img">
            <img className={!dark && "sky"} src={img ? img : AVA} alt="" />
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <CameraAltIcon className="cam" fontSize="large" />
            {uimg && (
              <div className="e-img-btn">
                <button onClick={upload}>UPLOAD</button>
                <progress value={prog} max="100" min="0" />
              </div>
            )}
          </div>
        ) : (
          <div className="p-img">
            <img className={!dark && "skyblue"} src={img ? img : AVA} alt="" />
          </div>
        )}
        <div>
          {edit ? (
            <div className="e-bio">
              <div>
                <p>Name</p>
                <input
                  type="text"
                  value={uname}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />
              </div>
              <div>
                <p>Bio</p>
                <textarea
                  type="text"
                  value={ubio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell something about you"
                />
              </div>
              <button onClick={prof}>UPDATE</button>
            </div>
          ) : (
            <div className="p-bio">
              <h1 className={!dark && "black"}>{name ? name : "WELCOME"}</h1>
              <p className={!dark && "black"}>
                {bio ? bio : "Tell something about youself"}
              </p>
            </div>
          )}
        </div>
      </div>

      {!edit && (
        <div className="p-posts">
          {imgData &&
            imgData.map((d) => (
              <img className={!dark && "sky"} src={d.data.photo} alt="" />
            ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
