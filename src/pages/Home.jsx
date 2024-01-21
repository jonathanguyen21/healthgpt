import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
        <div className='top'>
          <h2>HealthHub</h2>
          <h1>A Better You, A Healthier Tomorrow</h1>
        </div>
        <div className='mid'>
          <div className='mid-panels'>
            <div className="join-panels">
              <div className='become-driver'>
                <h1>HealthGPT 🍃</h1>
                <li>
                  <ul>🌿 Find general medical advice</ul>
                  <ul>🥗 Learn how to build healthy habits</ul>
                  <ul>🏃 Develop a better lifestyle</ul>
                </li>
                <Link to="/Chat">
                    <button>Start Chatting!</button>
                </Link>
              </div>
              <div className='become-passenger'>
                <h1>About Us 👨‍⚕️</h1>
                <li>
                  <ul>🩻 Find specialized care</ul>
                  <ul>🧑🏻‍⚕️ Search around for local doctors</ul>
                  <ul>😊 Decide the best choice for you</ul>
                </li>
                <Link to="/AboutUs">
                    <button>Find a doctor near you!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home