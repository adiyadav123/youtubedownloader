"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  Component1Icon,
  Component2Icon,
  Cross1Icon,
  ReloadIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  TableIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  const [btnClicked, setBtnClicked] = useState(false);
  const [videoURL, setVideoURL] = useState();
  const [DownloadURL, setDownloadURL] = useState();
  const [AllVideosArray, setAllVideosArray] = useState([]);
  const [VideoInfo, setVideoInfo] = useState([]);
  const [AudioVideo, setAudioVideo] = useState([]);
  const [ThumbnailURL, setThumbnailURL] = useState();

  const handleClick = async () => {
    if (!videoURL) {
      return toast({
        title: "Uh Oh! Something went wrong",
        description: "Video URL is required",
      });
    }

    if (btnClicked) {
      setBtnClicked(false);
    } else {
      setBtnClicked(true);
    }
    const url = "https://youtubedownloader-ten.vercel.app//api/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: videoURL }),
    })
      .then((res) => {
        if(!res.ok) {
          setBtnClicked(false);
          return toast({
            title: "Uh Oh! Something went wrong",
            description: "Please enter a valid YouTube URL",
          })
        }
        res.json()
      })
      .then((data) => {
        if(!data.info || !data.videoFormats) {
          setBtnClicked(false);
          return toast({
            title: "Uh Oh! Something went wrong",
            description: "Please enter a valid YouTube URL",
          })
        }
        setBtnClicked(false);
        setVideoInfo((prevState) => [...prevState, data.info]);
        setAllVideosArray((allVid) => [...allVid, data.videoFormats]);
        setDownloadURL(data.url);
        setAudioVideo((audVid) => [...audVid, data.formattedFormats]);
      });
  };

  const updateValue = (e) => {
    setVideoURL(e.target.value);
  };

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center flex-col p-10">
      <h1 className="text-3xl font-bold fixed top-0 left-0 h-15 bg-slate-100 w-full flex items-center justify-center p-3 backdrop-blur-md z-10 bg-opacity-30">
        <Component2Icon className="ml-[5px]" /> <Component1Icon className="ml-[5px]" /> <TableIcon className="ml-[5px]" /> <VideoIcon className="ml-[5px]" />
      </h1>

      <div className="h-10"></div>
      <div className="flex items-center justify-center">
        <Image className="w-1/2 hidden sm:block"
          src="https://i.ibb.co/9NT7wL7/dw-removebg.png"
          width={500}
          height={400}
          alt="Download Videos"
        />
        <div>
          <h2 className="text-2xl font-bold">Download Videos</h2>
          <p className="text-gray-500">
            Download YouTube videos in any format
          </p>
          <div className="h-5"></div>
          <Input
            onChange={updateValue}
            placeholder="Enter the video URL..."
            className="max-w-[80vw] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow"
          />

          <div className="h-10"></div>
          {btnClicked ? (
            <Button onClick={handleClick} className=" w-full bg-yellow text-black hover:bg-slate-100" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Searching{" "}
            </Button>
          ) : (
            <Button onClick={handleClick} className=" w-full bg-yellow text-black hover:bg-slate-100">
              {" "}
              Search
            </Button>
          )}
        </div>
      </div>

      <div className="h-10"></div>

      <div className="max-w-[80vw]">
        {VideoInfo.map((info, index) => {
          return (
            <div key={index}>
              <Image className="flex items-center justify-center w-[80vw]"
                src={`${info.thumbnail.split("?")[0] + "?width=350&height=400"}`}
                alt={info.title}
                width={350}
                height={400}
              />
              <Accordion type="single" collapsible className="w-[80vw]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Title</AccordionTrigger>
                  <AccordionContent>{info.title}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>View Count</AccordionTrigger>
                  <AccordionContent>{info.viewCount}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Length</AccordionTrigger>
                  <AccordionContent>
                    {(parseInt(info.lengthSeconds) / 60).toFixed(2)} minutes
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Channel Name</AccordionTrigger>
                  <AccordionContent>{info.channelName}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Subscriber Count</AccordionTrigger>
                  <AccordionContent>{info.subscriberCount}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>

      <div className="h-[20px]"></div>
      <div>
        {AudioVideo.map((videoArray, index) => {
          return (
            <div key={index}>
              {videoArray.map((video, videoIndex) => {
                return (
                  <div key={videoIndex}>
                    <Table className="w-[80vw]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[20vw]">Quality</TableHead>
                          <TableHead className="w-[20vw]">Type</TableHead>
                          <TableHead>Audio</TableHead>
                          <TableHead className="text-right w-[20vw]">
                            Link
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            {video.quality}
                          </TableCell>
                          <TableCell>
                            {video.hasVideo ? <VideoIcon /> : <Cross1Icon />}
                          </TableCell>
                          <TableCell>
                            {video.hasAudio ? (
                              <SpeakerLoudIcon className=" text-yellow" />
                            ) : (
                              <SpeakerOffIcon className=" text-red-500" />
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link
                              href={video.url}
                              className=" underline"
                              type="file"
                              download
                            >
                              Download
                            </Link>
                          </TableCell>
                        </TableRow>
                        <div className="h-[10px]"></div>
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        {AllVideosArray.map((videoArray, index) => (
          <div key={index}>
            {videoArray.map((video, videoIndex) => (
              <div className="w-full">
                <Table className="w-[80vw]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[20vw]">Quality</TableHead>
                      <TableHead className="w-[20vw]">Type</TableHead>
                      <TableHead>Audio</TableHead>
                      <TableHead className="text-right w-[20vw]">
                        Link
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {video.quality}
                      </TableCell>
                      <TableCell>
                        {video.hasVideo ? <VideoIcon className=" text-yellow" /> : <Cross1Icon />}
                      </TableCell>
                      <TableCell>
                        {video.hasAudio ? (
                          <SpeakerLoudIcon className="text-yellow" />
                        ) : (
                          <SpeakerOffIcon className="text-red" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={video.url}
                          className=" underline"
                          type="file"
                          download
                        >
                          Download
                        </Link>
                      </TableCell>
                    </TableRow>
                    <div className="h-[10px]"></div>
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="footer w-full fixed bottom-0 left-0 h-10 bg-slate-100 flex items-center justify-center backdrop-blur-md bg-opacity-55">
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/adiyadav123"
          target="_blank"
          className="ml-1"
        >
          Aditya Yadav
        </Link>
      </div>
    </div>
  );
}
