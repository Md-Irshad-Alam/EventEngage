import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import style from '../index.css'
const Home = () => {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
let socket; 
  useEffect(() => {
    socket = io('http://localhost:6060/');

    socket.on('recordAdded', (record) => {
      console.log(record);
      setRecords((prevRecords) => [...prevRecords, record]);
    });

    return () => {
      socket.disconnect();
    };
    
  }, []);

  const addRecord = (title, description, images) => {
    socket.emit('addRecord', { title, description, images });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord(title, description, images);
  };

  return (
    <div className='main-div '>
      <h2>Append Record</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          multiple
          name="file"
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Records List</h2>
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              <h3>{record.title}</h3>
              <p>{record.description}</p>
              <div>
                {record.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
