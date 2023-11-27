import { read } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (request: Request, res: NextApiResponse) => {
  // Assuming the incoming request has a JSON body
  const { prompt, seed } = await request.json();

  const credentials = process.env.SDWEBUI_AUTH;
  const base64Credentials = Buffer.from(credentials).toString("base64");
  // console.log(`Basic ${base64Credentials}`);

  console.log(seed);

  const promptData = {
    prompt,
    seed: seed,
    negative_prompt: "nsfw, bad quality, blurry, low resolution, bad angle",
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
  };

  console.log(JSON.stringify(promptData));

  try {
    // Make the external API request
    const generateImage = await fetch(
      "PLACEHOLDER",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credentials}`,
        },
        body: JSON.stringify(promptData),
      }
    );
    // Parse and return the external API response
    // const data = await generateImage.json();
    // console.log(data);

    let blob = await generateImage.blob();
    let buffer = Buffer.from(await blob.text());
    return new Response(buffer, { headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: "Failed to create a new image",
      status: 500,
    });
  }
};
