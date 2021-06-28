import Post from "../post/Post";
import "./posts.css";

// taking posts as prop
export default function Posts({ posts }) {
  return (
    <div className="posts">
      {/* // array map */}
      {posts.map((p) => (
        // passing post in Post component
        <Post post={p} />
      ))}
    </div>
  );
}