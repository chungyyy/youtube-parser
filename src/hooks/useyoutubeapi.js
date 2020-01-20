import { useState, useEffect } from "react";
import youtube from "../apis/youtube";

export const useYouTubeAPI = selectType => {
  const [data, setData] = useState({ videos: [] });
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let channelId = search || "UCvO6uJUVJQ6SrATfsWR5_aA";
        if (selectType === "username") {
          const searchResult = await youtube.get("/search", {
            params: {
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              part: "snippet",
              maxResults: 1,
              q: search,
              type: "channel"
            }
          });
          channelId = searchResult.data.items[0].snippet.channelId;
        }

        const channelResult = await youtube.get("/channels", {
          params: {
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            part: "contentDetails",
            id: channelId
          }
        });
        const uploadPlaylistId =
          channelResult.data.items[0].contentDetails.relatedPlaylists.uploads;

        let videosArr = [];
        let nextPageToken = null;
        let toggle = true;

        while (toggle) {
          const playlistResult = await youtube.get("/playlistItems", {
            params: {
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              part: "snippet",
              maxResults: 50,
              playlistId: uploadPlaylistId,
              pageToken: nextPageToken
            }
          });

          videosArr = videosArr.concat(playlistResult.data.items);
          nextPageToken = playlistResult.data.nextPageToken;

          if (!nextPageToken) toggle = false;
        }
        setData({ videos: videosArr });
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setIsLoading(false);
      }
    };
    setError(false);
    fetchData();
  }, [search]);

  return [{ data, isLoading, error }, { setSearch }];
};
