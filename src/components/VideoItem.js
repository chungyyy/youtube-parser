import React from "react";
import "../style/VideoItem.css";

function VideoItem({ video }) {
  return (
    <li className="video-li">
      <img
        className="video-item-img"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <div className="video-item-title">{video.snippet.title}</div>
    </li>
  );
}

export default VideoItem;
