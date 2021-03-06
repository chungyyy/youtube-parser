import React, { useState } from "react";
import { useYouTubeAPI } from "../hooks/useyoutubeapi";
import VideoList from "./VideoList";
import SearchBar from "./SearchBar";
import HighChart from "./HighChart";
import "../style/App.css";

function App() {
  const [channelIdQuery, setChannelIdQuery] = useState("");
  const [selectType, setSelectType] = useState("channelId");
  const [{ data, isLoading, error }, { setSearch }] = useYouTubeAPI(selectType);

  const handleSubmit = e => {
    e.preventDefault();
    setSearch(channelIdQuery);
    setChannelIdQuery("");
  };

  return (
    <div className="App-container">
      <SearchBar
        setSelectType={setSelectType}
        handleSubmit={handleSubmit}
        channelIdQuery={channelIdQuery}
        setChannelIdQuery={setChannelIdQuery}
      />
      <div className="search-explaination">
        {error}
      </div>
      <h5 className="search-explaination">
        Example: youtube.com/user/TechGuyWeb/; "TechGuyWeb" would be the
        username or youtube.com/channel/UCtJZYz0Hqh4rlKS_vYi3Fkw/;
        "UCtJZYz0Hqh4rlKS_vYi3Fkw" would be the channel Id.
      </h5>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <HighChart data={data} />
          <VideoList data={data} />
        </>
      )}
    </div>
  );
}

export default App;
