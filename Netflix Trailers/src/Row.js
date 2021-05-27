import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import youtube, { KEY } from "./youtube";
import { db } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import { imdb } from "./request";
import Axios from "axios";

const img_url = "https://image.tmdb.org/t/p/original/";
export const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [vid, setVid] = useState("");
  const [list, setList] = useState(false);
  const [{ user }] = useStateValue();
  const [isLarge, setIsLarge] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [rev, setRev] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(fetchUrl);
      setMovies(resp.data.results);
      console.log(resp.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie, isLargeRow) => {
    if (trailerUrl || isErr) {
      setTrailerUrl("");
      setList(false);
      setIsErr(false);
    } else {
      if (!isErr) {
        setIsLoad(true);
        const res = await youtube
          .get("/search", {
            params: {
              q: `${movie?.name || movie?.title} trailer`,
            },
          })
          .catch(() => setIsErr(true));
        setIsLoad(false);
        setTrailerUrl(res?.data?.items[0]?.id?.videoId);
        setVid(movie);
      } else {
        setTrailerUrl("");
        setIsErr(false);
      }
    }
    if (isLargeRow) setIsLarge(true);
    else setIsLarge(false);
  };

  const add = () => {
    db.collection("list")
      .doc(user?.email)
      .collection("playlist")
      .add({
        title: vid?.title || vid?.name,
        image: vid?.poster_path,
        url: trailerUrl,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        isLarge: isLarge,
      })
      .then(setList(true));
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <div>
            {movie.poster_path !== null && (
              <img
                key={movie.id}
                className={`poster ${isLargeRow && "poster_large"}`}
                src={`${img_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title}
                onClick={() => handleClick(movie)}
              />
            )}
          </div>
        ))}
      </div>
      {rev && <div className="review"></div>}
      {isLoad && (
        <div className="loading">
          <div className="loader"></div>
          <h1 className="load">Loading...</h1>
        </div>
      )}

      {isErr && (
        <p
          style={{
            color: "grey",
            padding: "20%",
            textAlign: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          Try Again Later...!
        </p>
      )}

      {trailerUrl && (
        <div>
          <Youtube videoId={trailerUrl} opts={opts} />
          <div className="flex">
            <button onClick={add} className="btn-2">
              ADD TO PLAYLIST
            </button>
            <p style={{ color: "grey" }}>
              {list && "Added to your Playlist successfully..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
