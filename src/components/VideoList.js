import React from "react";
import VideoItem from "./VideoItem";
import "../style/VideoList.css";

function VideoList({ data }) {
  const renderedVideos = data.videos.map(video => (
    <VideoItem key={video.id} video={video} />
  ));

  return <ul className="list-container">{renderedVideos}</ul>;
}

export default VideoList;
