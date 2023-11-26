"use client";

import React, { useState } from "react";
import GridImageDisplay from "@Components/GridImageDisplay";

const Gallery = () => {
  //   const [images, setImages] = useState([]);
  const images = [
    {
      id: "1",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    },
    {
      id: "2",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    },
  ];

  return (
    <>
      <div>
        <GridImageDisplay images={images}></GridImageDisplay>
      </div>
    </>
  );
};

export default Gallery;
