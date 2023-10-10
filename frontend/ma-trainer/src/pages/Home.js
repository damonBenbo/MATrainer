import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import useDataFetch from '../hooks/useDataFetch';

function Home() {
  const { data: techniques} = useDataFetch('http://localhost:5000/api/techniques');
  const { data: weapons} = useDataFetch('http://localhost:5000/api/weapons');
  const { data: forms} = useDataFetch('http://localhost:5000/api/forms');
  
  // Function to extract the YouTube video ID from the URL
  function getYouTubeVideoId(url) {
    const match = url && url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&?]+)/);
    return (match && match[1]) || '';
  }

  return (
    <div className="greeting">
      <h1>Welcome to Martial Arts Trainer!</h1>
      <p>Learn something new, or train your subject!</p>

      <div className="popular-lists">
        <h2>Popular Techniques</h2>
        <ul>
          {techniques.map((technique) => (
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
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="popular-lists">
        <h2>Popular Weapons</h2>
        <ul>
          {weapons.map((weapon) => (
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
      <div className="popular-lists">
        <h2>Popular Forms</h2>
        <ul>
          {forms.map((form) => (
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
                    frameBorder="0"
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