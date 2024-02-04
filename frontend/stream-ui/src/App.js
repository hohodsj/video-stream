import './App.css';
import React from "react";

import HelloWorld from './Components/HelloWorld'

import {useState} from 'react';
import VideoPlayer from './Components/VideoPlayer';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [videoId, setVideoId] = useState(null)

  function playVideo(e, videoId){
    e.preventDefault()
    setVideoId(videoId)
  }

  return (
    <div className="App">
      <p>data:{data}</p>
      <VideoPlayer videoId="1"></VideoPlayer>
    </div>
  );
}

export default App;
