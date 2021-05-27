import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Home.css";
import Post from "./Post";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState([]);
  const [imgData, setImgData] = useState([]);
  console.log("Posts.......", data);
  console.log(imgData);

  useEffect(() => {
    db.collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setData(
          snap?.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.email)
      .collection("profile")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setDatas(
          snap?.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.email)
      .collection("profImg")
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        setImgData(
          snap?.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, [user, data]);

  useEffect(() => {
    dispatch({
      type: "SET_NAME",
      name: datas[0]?.data?.name,
    });
    dispatch({
      type: "SET_BIO",
      bio: datas[0]?.data?.bio,
    });
    dispatch({
      type: "SET_IMG",
      img: imgData[0]?.data?.img,
    });
  }, [user, datas, imgData, dispatch]);

  return (
    <div className="home">
      {data && (
        <div className="posts">
          {data?.map((d) => (
            <Post
              name={d?.data?.username}
              img={d?.data?.userImg}
              bio={d?.data?.bio}
              email={d?.data?.email}
              photo={d?.data?.photo}
              caption={d?.data?.mes}
              time={d?.data?.curTime}
              right={user?.email === d?.data?.email && true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
