import React, { useEffect, useState } from "react";
import "./ProFri.css";
import { useStateValue } from "./StateProvider";
import AVA from "./avatar.png";
import { db } from "./firebase";

function ProFri() {
  const [{ profri, dark }] = useStateValue();
  const [post, setPost] = useState([]);
  console.log("profri...", profri);

  useEffect(() => {
    db.collection("users")
      .doc(profri?.email)
      .collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setPost(
          snap?.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div
      className={`profile profri ${!dark && "lightApp"} ${!post && "no-po"}`}
    >
      <div className="pf-img">
        <img
          className={!dark && "skyblue"}
          src={profri?.img ? profri?.img : AVA}
          alt=""
        />
      </div>
      <div className="pf-bio">
        <h1 className={!dark && "black"}>
          {profri?.name ? profri?.name : "USERNAME"}
        </h1>
        <p className={!dark && "black"}>{profri?.bio ? profri?.bio : "BIO"}</p>
      </div>

      <div className="p-posts">
        {post &&
          post.map((d) => (
            <img className={!dark && "sky"} src={d?.data?.photo} alt="" />
          ))}
      </div>
    </div>
  );
}

export default ProFri;
