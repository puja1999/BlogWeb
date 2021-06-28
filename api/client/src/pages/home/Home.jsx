import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]); // to store fetched data
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
     // console.log(res);
      setPosts(res.data); // set the post
    };
    fetchPosts(); // calling function
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        {/* // passing post data to Posts component */}
        <Posts posts={posts} /> 
        <Sidebar />
      </div>
    </>
  );
}