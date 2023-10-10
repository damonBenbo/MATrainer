// useYouTubeVideoId.js fetches youtube embed player

import { useState, useEffect } from 'react';

function getYouTubeVideoId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&?]+)/);
  return (match && match[1]) || '';
}

function useYouTubeVideoId(videoUrl) {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    setVideoId(getYouTubeVideoId(videoUrl));
  }, [videoUrl]);

  return videoId;
}

export default useYouTubeVideoId;
