import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';

const containerStyle = css`
  text-align: center;
`;

const headingStyle = css`
  font-size: 24px;
  color: #333;
`;

const listStyle = css`
  list-style: none;
  padding: 0;
`;

const listItemStyle = css`
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
`;

function Home() {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    async function fetchTechniques() {
      try {
        const response = await axios.get('/api/techniques');
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
    <div css={containerStyle}>
      <h1 css={headingStyle}>Welcome to My Martial Arts Trainer!</h1>
      <p>Here you can explore and learn martial arts techniques.</p>

      <h2>Popular Techniques</h2>
      <ul css={listStyle}>
        {techniques.map((technique) => (
          <li key={technique.id} css={listItemStyle}>
            <strong>{technique.name}</strong>
            <p>{technique.description}</p>
            
            {/* Embed the YouTube video */}
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(technique.video_url)}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;