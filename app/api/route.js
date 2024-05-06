import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

require("events").EventEmitter.setMaxListeners(15);

export async function POST(request) {
  const urlObj = await request.json();
  if (!urlObj.url) {
    return new Response("URL is required", { status: 400 });
  }
  try {
    const videoURL = urlObj.url;
    const info = await ytdl.getInfo(videoURL);
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");
    const videoFormats = ytdl.filterFormats(info.formats, "video");
    const audioOnly = ytdl.filterFormats(info.formats, "audioonly");

    if (!formats.length) {
      return NextResponse.error("No formats found", { status: 400 });
    }


    // const formattedHighestVideo = highestQualityVideo.map((format) => {
    //   return {
    //     itag: format.itag,
    //     quality: format.qualityLabel,
    //     url: format.url,
    //     mimeType: format.mimeType,
    //     container: format.container,
    //     codec: format.codecs,
    //     audioBitrate: format.audioBitrate,
    //     videoBitrate: format.bitrate,
    //     audioQuality: format.audioQuality,
    //     videoQuality: format.quality,
    //     hasAudio: format.hasAudio,
    //     hasVideo: format.hasVideo,
    //     isLive: format.isLive,
    //     isHLS: format.isHLS,
    //   }
    // })

    const infoFormatted = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      lengthSeconds: info.videoDetails.lengthSeconds,
      description: info.videoDetails.description,
      viewCount: info.videoDetails.viewCount,
      channelName: info.videoDetails.author.name,
      subscriberCount: info.videoDetails.author.subscriber_count,
    };



    const formattedFormats = formats.map((format) => {
      return {
        itag: format.itag,
        quality: format.qualityLabel,
        url: format.url,
        mimeType: format.mimeType,
        container: format.container,
        codec: format.codecs,
        audioBitrate: format.audioBitrate,
        videoBitrate: format.bitrate,
        audioQuality: format.audioQuality,
        videoQuality: format.quality,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        isLive: format.isLive,
        isHLS: format.isHLS,
      };
    });

    const formattedAudioOnly = audioOnly.map((format) => {
      return {
        itag: format.itag,
        quality: format.qualityLabel,
        url: format.url,
        mimeType: format.mimeType,
        container: format.container,
        codec: format.codecs,
        audioBitrate: format.audioBitrate,
        audioQuality: format.audioQuality,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        isLive: format.isLive,
        isHLS: format.isHLS,
      }
    });

    const videoFormattedFormats = videoFormats.map((format) => {
      return {
        itag: format.itag,
        quality: format.qualityLabel,
        url: format.url,
        mimeType: format.mimeType,
        container: format.container,
        codec: format.codecs,
        audioBitrate: format.audioBitrate,
        videoBitrate: format.bitrate,
        audioQuality: format.audioQuality,
        videoQuality: format.quality,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        isLive: format.isLive,
        isHLS: format.isHLS,
      };
    });

    const downloadURL = formats[0].url;
    return NextResponse.json({
      url: downloadURL,
      info: infoFormatted,
      videoFormats: videoFormattedFormats,
      formattedFormats: formattedFormats,
      audioOnly: formattedAudioOnly,
    });
  } catch (error) {
    return NextResponse.error("Invalid URL", { status: 400 });
  }
}
