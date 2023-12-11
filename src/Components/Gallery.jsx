import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/Gallery-app.scss';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const API_SET = "https://api.unsplash.com/photos/";
  const API_KEY = "pnlX-ZNr4MrE350J7ovcCdI6DJvwdDkQEAOEq1fj6Ss";

  const [pageCurrent, setPageCurrent] = useState(1);
  const [searchQuery, setSearchQuery] = useState("coffe");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_SET}?page=${pageCurrent}&client_id=${API_KEY}&query=${searchQuery}`
          );
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [pageCurrent, searchQuery]);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight + 1) {
        setTimeout(() => {
          setPageCurrent((prevPage) => prevPage + 1);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='Art-gallery'>
      <div className='header-bottom'>
        <input
          type="text"
          placeholder="Поиск"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='gallery-images'>
        {photos.map((photo) => (
          <div className='images'
           key={photo.id}>
            <img src={photo.urls.small} alt={photo.description || 'No description'} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
