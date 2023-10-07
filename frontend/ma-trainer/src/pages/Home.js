import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    async function fetchTechniques() {
      try {
        const response = await axios.get('http://localhost:5000/api/techniques');
        setTechniques(response.data);
      } catch (error) {
        console.error('Error fetching techniques:', error);
      }
    }

    fetchTechniques();
  }, []);

  // Function to extract the YouTube video ID from the URL
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&?]+)/);
    return (match && match[1]) || '';
  }

  return (
    <div className="greeting">
      <h1>Welcome to Martial Arts Trainer!</h1>
      <p>Learn something new, or train your subject!</p>

    <div className="popular-techniques">
      <h2>Popular Techniques</h2>
      <ul>
        {techniques.map((technique) => (
          <li key={technique.id}>
            <strong>{technique.name}</strong>
            <p>{technique.description}</p>
            
            {/* Embed the YouTube video */}
            <div className="iframe">
            <iframe
              title="Video Player"
              width="280"
              height="155"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(technique.video_url)}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Home;