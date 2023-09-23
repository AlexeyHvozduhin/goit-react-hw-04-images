import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import './style.css';

import { searchImages } from './API';

const SEPARATOR = '///';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query !== '') {
      setLoading(true);
      async function imageGallery() {
        try {
          const [request] = query.split(SEPARATOR);
          const arrayImage = await searchImages(request, page);
          setImages(prevImages => [...prevImages, ...arrayImage]);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      imageGallery();
    }
  }, [page, query]);

  const onSubmit = async line => {
    if (line !== '') {
      setQuery(`${line}${SEPARATOR}${Date.now()}`);
      setPage(1);
      setImages([]);
      //
      window.scrollTo(0, 0);
    }
  };

  const addElements = async () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div
      style={{
        margin: '50px 0 0 0',
      }}
      className="App"
    >
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length > 0 && <Button addElements={addElements} />}
      {error && !loading && (
        <div
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: '40px',
            fontFamily: 'cursive',
          }}
        >
          ERROR! :c
        </div>
      )}
    </div>
  );
};
