import React from 'react';
import useDataFetch from './useDataFetch';
import './techniques.css';

function TechniquesList() {
    const { data, isLoading, error } = useDataFetch('http://localhost:5000/api/techniques');
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div className="popular-techniques">
        <h2>Techniques</h2>
        <ul>
          {data.map((technique) => ( // Change 'techniques' to 'data' here
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
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TechniquesList;