import React, { useState, useEffect } from 'react';
import './Home.css';
import useDataFetch from '../hooks/useDataFetch';

function Home() {
  const { data: techniques } = useDataFetch('https://matrainer.onrender.com/api/techniques');
  const { data: weapons } = useDataFetch('https://matrainer.onrender.com/api/weapons');
  const { data: forms } = useDataFetch('https://matrainer.onrender.com/api/forms');

  // Function to extract the YouTube video ID from the URL
  function getYouTubeVideoId(url) {
    const match = url && url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&?]+)/);
    return (match && match[1]) || '';
  }

  // Function to filter and sort the data to only show 3 most recent for each category
  function filterAndSortData(data, limit = 3) {
    return data
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
      .slice(0, limit); // Take only the first 'limit' items
  }

  return (
    <div className="greeting">
      <h1>Welcome to Martial Arts Trainer!</h1>
      <p>Learn something new, or train your subject!</p>

      <div className="recent-lists">
        <h2>Recently Added Techniques</h2>
        <ul>
          {filterAndSortData(techniques).map((technique) => (
            <li key={technique.id}>
              <strong>{technique.name}</strong>
              <p>{technique.description}</p>

              {/* Embed the YouTube video if the URL is not null */}
              {technique.video_url && (
                <div className="iframe">
                  <iframe
                    title="Video Player"
                    width="280"
                    height="155"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(technique.video_url)}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="recent-lists">
        <h2>Recently Added Weapons</h2>
        <ul>
          {filterAndSortData(weapons).map((weapon) => (
            <li key={weapon.id}>
              <strong>{weapon.name}</strong>
              <p>{weapon.description}</p>
              <div alt="weapon image" className="weapon-img">
                <img src={weapon.img} alt={weapon.name}></img>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="recent-lists">
        <h2>Recently Added Forms</h2>
        <ul>
          {filterAndSortData(forms).map((form) => (
            <li key={form.id}>
              <strong>{form.name}</strong>
              <p>{form.description}</p>

              {/* Embed the YouTube video if the URL is not null */}
              {form.video_url && (
                <div className="iframe">
                  <iframe
                    title="Video Player"
                    width="280"
                    height="155"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(form.video_url)}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
