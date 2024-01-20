import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
        <div className='top'>
          <h2>HealthHub</h2>
          <h1>Helping one person at a time.</h1>
        </div>
        <div className='mid'>
          <div className='mid-panels'>
            <div className="join-panels">
              <div className='become-driver'>
                <h1>HealthGPT 🍃</h1>
                <li>
                  <ul>🍃 Find general medical advice</ul>
                  <ul>🍃 Learn how to build healthy habits</ul>
                  <ul>🍃 Develop a better lifestyle</ul>
                </li>
                <button>Start Chatting!</button>
              </div>
              <div className='become-passenger'>
                <h1>Find a Doctor 👨‍⚕️</h1>
                <li>
                  <ul>👨‍⚕️ Search local or long distance ride offers</ul>
                  <ul>👨‍⚕️ Share rides with fellow UCSC students</ul>
                  <ul>👨‍⚕️ Save money and enjoy sharing a ride</ul>
                </li>
                <button>Find a doctor near you!</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home