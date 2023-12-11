import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Gallery-app.scss';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const API_SET = "https://api.unsplash.com/photos/";
  const API_KEY = "pnlX-ZNr4MrE350J7ovcCdI6DJvwdDkQEAOEq1fj6Ss";

  const [searchValue, setSearchValue] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_SET}?query=${searchValue.current}&page=${pageCurrent}&client_id=${API_KEY}`
        );
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue.current, pageCurrent]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight + 1) {
        setTimeout(()=>{
          setPageCurrent((prevPage) => prevPage + 1);

        }, 3000)
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
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск"
        />
      </div>
      <div className='gallery-images'>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.urls.small} alt={photo.description || 'No description'} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
