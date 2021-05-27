import React, { useState, useEffect } from "react";
import axios from "./axios";
import req from "./request";
import "./Banner.css";
import { Link } from "react-router-dom";
import Row from "./Row";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [word, setWord] = useState(null);
  const [movs, setMovs] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(
        "/discover/tv?api_key=ddc242ac9b33e6c9054b5193c541ffbb&with_networks=213"
      );
      setMovie(
        resp.data.results[
          Math.floor(Math.random() * resp.data.results.length - 1)
        ]
      );
      return resp;
    }
    fetchData();
  }, []);

  const search = async () => {
    if (movs) setMovs(false);
    else setMovs(true);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div className={`full ${movs && "new"}`}>
      <div
        className={`banner ${movs && "new"}`}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
          height: "442px",
        }}
      >
        <div className="content">
          <h1 className="title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="buttons">
            <Link to="/list">
              <button className="btn">Play</button>
              <button className="btn">My List</button>
            </Link>
          </div>
          <h2 className="desc">{truncate(movie?.overview, 200)}</h2>
        </div>
        <div className="gradient-2" />
      </div>
      <div className="search">
        <div className="inp">
          <input
            type="text"
            value={word}
            placeholder="Seach Netflix Originals"
            onChange={(e) => setWord(e.target.value)}
          />
          <button className="btn-2" onClick={search}>
            SEARCH
          </button>
        </div>
        {movs && (
          <Row
            fetchUrl={`/search/tv?api_key=ddc242ac9b33e6c9054b5193c541ffbb&language=en-US&with_networks=213&page=1&include_adult=false&query=${word}`}
            isLargeRow
          />
        )}
      </div>
    </div>
  );
}

export default Banner;
