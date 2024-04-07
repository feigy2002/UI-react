import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-page'>
      {/* <img src={logo} alt="logo" /> */}
      <h2 className='logo'>Time Tunnel</h2>
      <div id="box" role="button" onClick={() => navigate('event-search')} />
    </div>
  )
}

export default Home;
