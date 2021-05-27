import youtube from "./youtube";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { db } from "./firebase";
import "./List.css";
import { opts } from "./Row";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/original";

function List() {
  const [{ user }] = useStateValue();
  const [list, setList] = useState([]);
  const [mov, setMov] = useState(false);
  const [url, setUrl] = useState("");

  console.log("list", list);

  useEffect(() => {
    db.collection("list")
      .doc(user?.email)
      .collection("playlist")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setList(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    <div className="list">
      <div className="navs">
        <Link to="/">
          <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
            alt="NETFLIX LOGO"
          />
        </Link>
      </div>
      <h1>Your Playlist</h1>
      <div className="posters ps">
        {list.length !== 0 ? (
          list.map((vid) => (
            <img
              onClick={
                mov
                  ? () => setMov(false)
                  : () => {
                      setMov(true);
                      setUrl(vid.data.url);
                    }
              }
              className="poster poster_large"
              src={`${img_url}${vid.data.image}`}
              alt={vid?.title}
            />
          ))
        ) : (
          <div
            style={{
              color: "grey",
              padding: "20%",
              textAlign: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1>Your Playlist is Empty...!</h1>
          </div>
        )}
      </div>
      {mov && <YouTube videoId={url} opts={opts} />}
      <Link to="/">
        <button
          className="btn-2"
          style={{
            position: "relative",
            margin: "15px 10px",
            bottom: "2%",
            width: "25%",
          }}
        >
          BACK
        </button>
      </Link>
    </div>
  );
}

export default List;
