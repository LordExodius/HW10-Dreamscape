"use client";

import React, { useState, useEffect } from "react";
import "./dreamboard.css";
import GridImageDisplay from "@Components/GridImageDisplay";

const CreateDreamBoard: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [prevSeed, setPrevSeed] = useState("-1");

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const generateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(prevSeed);
      const res = await fetch("/api/dreamboard/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "<lora:lcm-lora-sdv1-5> " +
            userPrompt +
            ", dream, dreamboard, dream board, high resolution, high quality, ultra hd",
          seed: prevSeed,
        }),
      });

      if (res.ok) {
        console.log("Image recieved");

        let data = await res.json();

        let base64 = "data:image/png;base64," + data.images[0];

        // Create an object for the new image with a unique ID and src
        const newImage = {
          id: generateUniqueId(),
          src: base64,
          caption: userPrompt,
        };

        setImages((prevImages) => [...prevImages, newImage]);

        const infoObject = JSON.parse(data.info);
        const seed = infoObject.seed;
        setPrevSeed(seed);
      }
    } catch (e) {
      console.error("Failed to generate image", e);
    }
  };

  return (
    <>
      <div className="waitingRoom-page">
        <div className="waiting-stat">
          <h1 className="head_text">Dream Board</h1>
        </div>

        <div className="gptChat">
          <div className="title">
            <p>
              This chatbot will help you create a dreamboard by asking you
              questions about your dream.
            </p>
          </div>

          <div className="chatarea">
            <div className="chatbox">
              <GridImageDisplay images={images} />
            </div>

            <div
              id="gallery"
              className="grid-cols-2 md:grid-cols-3 gap-4"
            ></div>

            <form className="queryBox" onSubmit={generateImage}>
              <input
                type="text"
                placeholder="What did you dream?"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="text-black"
              />
              <button className="button generate-button" type="submit">
                Generate
              </button>
              <button className="button save-button" type="button">
                Save
              </button>{" "}
              {/* Updated line */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDreamBoard;
