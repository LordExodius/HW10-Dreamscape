import React, { useState, useEffect } from "react";
import Post from "./Post";
// import { useSession } from "next-auth/client";

// interface for post
interface Post {
  id: string;
  user: string;
  storyboard: string;
  caption: string;
  likes: number;
}

const Posts = () => {
  // const { data: session } = useSession();
  //template user
  const session = { user: { id: "1" } };
  const [posts, setPosts] = useState<Post[]>([]);

  // get posts from db
  useEffect(() => {
    // fetch posts
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?userID=${session?.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();

        if (res.ok) {
          setPosts(json.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          user={post.user}
          storyboard={post.storyboard}
          caption={post.caption}
          likes={post.likes}
        />
      ))}
    </>
  );
};

export default Posts;
