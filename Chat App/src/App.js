import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Header from "./Header";
import Home from "./Home";
import { useEffect } from "react";
import { auth } from "./firebase";
import Profile from "./Profile";
import Footer from "./Footer";
import ProFri from "./ProFri";
import logo from "./logo.png";
import axios from "axios";

function App() {
  const [{ user, dark }, dispatch] = useStateValue();

  navigator.serviceWorker.addEventListener("message", (mes) =>
    console.log(mes)
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, [user, dispatch]);

  return (
    <div className={`App ${!dark && "lightApp"}`}>
      <Router>
        <Switch>
          <Route path="/profile">
            <Header />
            <Profile />
            <Footer />
          </Route>
          <Route path="/view">
            <Header />
            <ProFri />
            <Footer />
          </Route>
          <Route path="/">
            {user ? (
              <div>
                <Header />
                <Home />
                <Footer />
              </div>
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
