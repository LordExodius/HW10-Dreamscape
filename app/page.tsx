"use client";

import { UserHome } from "@/Components";
import Feed from "@/Components/Feed";
import Posts from "@/Components/Posts";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Logo from "@images/logo.png";
import "./HomePage.css";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <main>
      {/* <Posts></Posts> */}
      <div className="centered-image-container">
        <Image src="/Logo.png" alt="Logo" width={500} height={300}></Image>
      </div>
    </main>
  );
};

export default Home;
