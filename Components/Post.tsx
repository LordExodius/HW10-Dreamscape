"use client";
import React from "react";

interface PostProps {
  user: string;
  storyboard: string;
  caption: string;
  likes: number;
}

const Post = ({ user, storyboard, caption, likes }: PostProps) => {
  return (
    <>
      <div>User Section {user}</div>
      <div>StoryBoard Section {storyboard}</div>
      <div>Likes Section {likes}</div>
      <div>Caption Section {caption}</div>
    </>
  );
};

export default Post;
