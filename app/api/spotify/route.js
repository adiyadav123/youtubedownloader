import { NextResponse } from "next/server";
import spottydl from "spottydl";

require("events").EventEmitter.setMaxListeners(15);

export async function POST(request) {
  const urlObj = await request.json();
  if (!urlObj.url) {
    return new NextResponse.json({
      message: "URL is required",
    });
  }

  try {
    async () => {
      await spottydl.getTrack(urlObj.url).then((results) => {
        console.log(results);
      });
    };
  } catch (error) {
    return new NextResponse.json({
      message: "An error occurred",
    });
  }
}
