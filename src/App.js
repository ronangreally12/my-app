import './App.css';
import React, { useState, useEffect } from 'react';
import AnimalList from './components/AnimalList';
import CustomTabPanel from './components/CustomTabPanel';
import Background from './catdog.jpeg';
// MUI
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

var sectionStyle = {
  width: "100%",
  height: '100vh',
  backgroundImage: `url(${Background})`,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tab, setTab] = React.useState(0);
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const urlCats = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=cats&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const urlDogs = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    fetch(urlCats)
      .then(response => response.json())
      .then(json => setCats(json))
      .catch(error => console.error(error));

    fetch(urlDogs)
    .then(response => response.json())
    .then(json => setDogs(json))
    .catch(error => console.error(error));

  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  return (
    <div className="App" style={ sectionStyle }>
     <Container maxWidth="lg">
          <div className="tabs-container">
            <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Cats" {...a11yProps(0)} />
              <Tab label="Dogs" {...a11yProps(1)} />
            </Tabs>
          </div>
          <CustomTabPanel value={tab} index={0}>
            <AnimalList animals={cats} windowWidth={windowSize[0]}/>
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1} >
            <AnimalList animals={dogs} windowWidth={windowSize[0]}/>
          </CustomTabPanel>
      </Container>
    </div>
  );
}

export default App;
