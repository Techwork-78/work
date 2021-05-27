import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import req, { imdb } from "./request";
import "./App.css";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./List";
import { useStateValue } from "./StateProvider";

function App() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [er, setEr] = useState("");

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [user, dispatch]);

  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, pw)
      .catch((err) => setEr(err.message))
      .then(() => {
        setEmail("");
        setPw("");
        setEr("");
      });
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Signup />
        </Route>
        <Route path="/list">
          <List user={user} />
        </Route>
        <Route path="/">
          <div className="app">
            {!user ? (
              <div className="sign">
                <div className="gradientTop">
                  <div className="nav">
                    <img
                      className="nav_logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                      alt="NETFLIX LOGO"
                    />
                    <Link to="/login">
                      <button className="btn-2">Sign In</button>
                    </Link>
                  </div>
                </div>

                <div className="signUp">
                  <h1>Unlimited movies, TV shows and more.</h1>
                  <h4>Watch anywhere. Cancel anytime.</h4>
                  <h6>
                    Ready to watch trailers now ? Sign up to create your
                    membership.
                  </h6>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="pw">
                    <input
                      type="password"
                      placeholder="Password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      required
                    />
                    <button onClick={signup}>SIGNUP</button>
                  </div>
                  <div className="error">{er}</div>
                </div>
                <div className="gradient"></div>
              </div>
            ) : (
              <div className="main">
                <Nav user={user} />
                <Banner />
                <Row
                  title="NETFLIX ORIGINALS"
                  fetchUrl={req.fetchOriginals}
                  rating={imdb}
                  isLargeRow
                />
                <Row
                  user={user}
                  title="Trending Now"
                  fetchUrl={req.fetchTrending}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Upcoming"
                  fetchUrl={req.fetchUpcoming}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Top Rated"
                  fetchUrl={req.fetchTopRated}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Action Movies"
                  fetchUrl={req.fetchAction}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Comedy Movies"
                  fetchUrl={req.fetchComedy}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Horror Movies"
                  fetchUrl={req.fetchHorror}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Romance Movies"
                  fetchUrl={req.fetchRomance}
                  rating={imdb}
                />
                <Row
                  user={user}
                  title="Documenteries"
                  fetchUrl={req.fetchDocumentaries}
                  rating={imdb}
                />
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
